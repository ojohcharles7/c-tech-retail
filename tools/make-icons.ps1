<#
.SYNOPSIS
  Builds every app icon from icons/source.jpg.

.DESCRIPTION
  The launcher icon is a single artwork file, icons/source.jpg. This script
  crops off any uniform border the artwork is padded with, then resamples the
  square result to each size the browsers and Windows ask for.

  The artwork is scaled to fill the whole canvas (full bleed). Android crops
  maskable icons to a circle and iOS crops apple-touch-icon to a squircle, so
  the corners of the artwork are what get clipped -- set $InnerScale below if
  the artwork has detail near its edges that must survive the crop.

  No dependencies: uses the System.Drawing assembly already in Windows.

.EXAMPLE
  npm run icons
  powershell -NoProfile -ExecutionPolicy Bypass -File tools\make-icons.ps1
  powershell ... -File tools\make-icons.ps1 -Source C:\path\to\other.jpg
#>
[CmdletBinding()]
param(
  [string] $SourcePath
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
if (-not $SourcePath) { $SourcePath = Join-Path $Root 'icons\source.jpg' }
$SourcePath = (Resolve-Path $SourcePath).Path

# Luma below this counts as "padding", not artwork.
$PaddingThreshold = 8

function Get-Luma($bitmap, $x, $y) {
  $c = $bitmap.GetPixel($x, $y)
  0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B
}

function Get-ContentBox($bitmap) {
  $w = $bitmap.Width
  $h = $bitmap.Height

  $midX = [int]($w / 2)
  $midY = [int]($h / 2)

  $top = 0
  while ($top -lt $h -and (Get-Luma $bitmap $midX $top) -lt $PaddingThreshold) { $top++ }
  $bottom = 0
  while ($bottom -lt $h -and (Get-Luma $bitmap $midX ($h - 1 - $bottom)) -lt $PaddingThreshold) { $bottom++ }
  $left = 0
  while ($left -lt $w -and (Get-Luma $bitmap $left $midY) -lt $PaddingThreshold) { $left++ }
  $right = 0
  while ($right -lt $w -and (Get-Luma $bitmap ($w - 1 - $right) $midY) -lt $PaddingThreshold) { $right++ }

  $box = New-Object System.Drawing.Rectangle(
    $left, $top, ($w - $left - $right), ($h - $top - $bottom))

  # A sane crop is square, reasonably large, and actually near the edges.
  $square = [Math]::Abs($box.Width - $box.Height) -le 2
  $big = $box.Width -ge 32 -and $box.Height -ge 32
  $trimmed = ($box.Width -lt $w - 1) -or ($box.Height -lt $h - 1)
  if (-not ($square -and $big -and $trimmed)) {
    $side = [Math]::Min($w, $h)
    $box = New-Object System.Drawing.Rectangle(
      [int](($w - $side) / 2), [int](($h - $side) / 2), $side, $side)
  }
  return $box
}

function New-IconBitmap($image, $box, $size) {
  $bitmap = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

  # WrapMode stops GDI+ smearing the opposite edge in when it resamples.
  $attributes = New-Object System.Drawing.Imaging.ImageAttributes
  $attributes.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)

  $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::Black)

  $destination = New-Object System.Drawing.Rectangle 0, 0, $size, $size
  $graphics.DrawImage($image, $destination, $box.X, $box.Y, $box.Width, $box.Height,
    [System.Drawing.GraphicsUnit]::Pixel, $attributes)

  $graphics.Dispose()
  $attributes.Dispose()
  return $bitmap
}

# Luma at or below this is treated as background rather than artwork.
$CornerLuma = 40
# The badge colour must cover at least this much of the canvas before we trust
# it enough to paint the corners with. Guards against flooding a photo.
$CornerMinShare = 0.25

function Get-LumaAt($bytes, $stride, $index) {
  $b = $bytes[$index]
  $g = $bytes[$index + 1]
  $r = $bytes[$index + 2]
  0.299 * $r + 0.587 * $g + 0.114 * $b
}

function Set-PixelAt($bytes, $stride, $index, $r, $g, $b) {
  $bytes[$index] = $b
  $bytes[$index + 1] = $g
  $bytes[$index + 2] = $r
  $bytes[$index + 3] = 255
}

# The artwork is a rounded-corner badge sitting on a black canvas, so cropping
# the padding off leaves black triangles in the corners of an otherwise square
# image. Platforms mask those corners away (Android with a circle, iOS and
# Windows with a squircle) but unmasked places -- a browser tab, a Start tile
# -- would show them. Flood the corners with the badge's own dominant colour so
# the icon is genuinely full bleed and every crop lands on artwork.
function Repair-Corners($bitmap) {
  $w = $bitmap.Width
  $h = $bitmap.Height
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $locked = $bitmap.LockBits($rect,
    [System.Drawing.Imaging.ImageLockMode]::ReadWrite,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $stride = $locked.Stride
  $bytes = New-Object byte[] ($stride * $h)
  [System.Runtime.InteropServices.Marshal]::Copy($locked.Scan0, $bytes, 0, $bytes.Length)

  try {
    # Dominant colour among the bright pixels, quantised to catch near-shades.
    # A 16x16x16 tally avoids string keys entirely.
    $tally = New-Object 'int[]' 4096
    $sampled = 0
    for ($y = 0; $y -lt $h; $y += 2) {
      $row = $y * $stride
      for ($x = 0; $x -lt $w; $x += 2) {
        $i = $row + ($x * 4)
        if ((Get-LumaAt $bytes $stride $i) -lt 128) { continue }
        $sampled++
        $key = (($bytes[$i + 2] -shr 4) * 256) + (($bytes[$i + 1] -shr 4) * 16) + ($bytes[$i] -shr 4)
        $tally[$key]++
      }
    }
    if ($sampled -eq 0) { return 0 }

    $bestKey = 0
    for ($k = 1; $k -lt 4096; $k += 1) {
      if ($tally[$k] -gt $tally[$bestKey]) { $bestKey = $k }
    }
    if (($tally[$bestKey] / $sampled) -lt $CornerMinShare) { return 0 }

    $fillR = ($bestKey -shr 8) * 17
    $fillG = (($bestKey -shr 4) -band 15) * 17
    $fillB = ($bestKey -band 15) * 17

    # Flood from each corner, crossing only dark pixels, so dark detail inside
    # the badge is left alone.
    $visited = New-Object bool[] ($w * $h)
    $stack = New-Object System.Collections.ArrayList
    $repaired = 0

    $corners = @(
      @(0, 0),
      @(($w - 1), 0),
      @(0, ($h - 1)),
      @(($w - 1), ($h - 1))
    )
    foreach ($origin in $corners) {
      $ox = $origin[0]
      $oy = $origin[1]
      if ((Get-LumaAt $bytes $stride (($oy * $stride) + ($ox * 4))) -ge $CornerLuma) { continue }

      [void]$stack.Clear()
      [void]$stack.Add(($oy * $w) + $ox)
      $visited[($oy * $w) + $ox] = $true

      while ($stack.Count -gt 0) {
        $pixel = [int]$stack[$stack.Count - 1]
        $stack.RemoveAt($stack.Count - 1)

        $py = [Math]::Floor($pixel / $w)
        $px = $pixel - ($py * $w)
        Set-PixelAt $bytes $stride (($py * $stride) + ($px * 4)) $fillR $fillG $fillB
        $repaired++

        foreach ($step in @(@(1, 0), @(-1, 0), @(0, 1), @(0, -1))) {
          $nx = $px + $step[0]
          $ny = $py + $step[1]
          if ($nx -lt 0 -or $nx -ge $w -or $ny -lt 0 -or $ny -ge $h) { continue }
          $next = ($ny * $w) + $nx
          if ($visited[$next]) { continue }
          if ((Get-LumaAt $bytes $stride (($ny * $stride) + ($nx * 4))) -ge $CornerLuma) { continue }
          $visited[$next] = $true
          [void]$stack.Add($next)
        }
      }
    }

    if ($repaired -gt 0) {
      [System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $locked.Scan0, $bytes.Length)
    }
    return $repaired
  } finally {
    $bitmap.UnlockBits($locked)
  }
}

function Save-Png($bitmap, $relativePath) {
  $target = Join-Path $Root $relativePath
  $folder = Split-Path $target -Parent
  if (-not (Test-Path $folder)) { New-Item -ItemType Directory -Path $folder -Force | Out-Null }
  $bitmap.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
  $kb = [Math]::Round((Get-Item $target).Length / 1KB, 1)
  '  {0,-32}{1,8} KB' -f $relativePath, $kb
}

# .NET has no multi-size .ico writer, so build the container by hand around
# PNG payloads, which Windows has read since Vista.
function Save-Ico($bitmaps, $relativePath) {
  $target = Join-Path $Root $relativePath
  $payloads = @()
  foreach ($bitmap in $bitmaps) {
    $stream = New-Object System.IO.MemoryStream
    $bitmap.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
    $payloads += , $stream.ToArray()
  }

  $writer = New-Object System.IO.BinaryWriter ([System.IO.File]::Create($target))
  $writer.Write([UInt16]0)                      # reserved
  $writer.Write([UInt16]1)                      # type: icon
  $writer.Write([UInt16]$bitmaps.Count)

  $offset = 6 + (16 * $bitmaps.Count)
  for ($i = 0; $i -lt $bitmaps.Count; $i++) {
    $size = $bitmaps[$i].Width
    $writer.Write([Byte]($(if ($size -ge 256) { 0 } else { $size })))  # width, 0 means 256
    $writer.Write([Byte]$(if ($size -ge 256) { 0 } else { $size }))    # height
    $writer.Write([Byte]0)                       # palette size
    $writer.Write([Byte]0)                       # reserved
    $writer.Write([UInt16]1)                     # colour planes
    $writer.Write([UInt16]32)                    # bits per pixel
    $writer.Write([UInt32]$payloads[$i].Length)
    $writer.Write([UInt32]$offset)
    $offset += $payloads[$i].Length
  }
  foreach ($payload in $payloads) { $writer.Write($payload) }
  $writer.Dispose()

  $kb = [Math]::Round((Get-Item $target).Length / 1KB, 1)
  '  {0,-32}{1,8} KB' -f $relativePath, $kb
}

# --------------------------------------------------------------------- build

$image = [System.Drawing.Image]::FromFile($SourcePath)
$box = Get-ContentBox $image

''
'Building icons from {0}' -f $SourcePath
'  source        {0} x {1}' -f $image.Width, $image.Height
'  artwork crop  {0},{1} -> {2},{3}  ({4}x{5})' -f $box.X, $box.Y, `
  ($box.X + $box.Width - 1), ($box.Y + $box.Height - 1), $box.Width, $box.Height
''

# name, size, purpose. Anything marked maskable is cropped by Android.
$targets = @(
  @{ name = 'icons/icon-32.png'; size = 32 },
  @{ name = 'icons/icon-96.png'; size = 96 },
  @{ name = 'icons/icon-144.png'; size = 144 },
  @{ name = 'icons/icon-180.png'; size = 180 },
  @{ name = 'icons/apple-touch-icon.png'; size = 180 },
  @{ name = 'icons/icon-192.png'; size = 192 },
  @{ name = 'icons/icon-512.png'; size = 512 },
  @{ name = 'icons/maskable-192.png'; size = 192 },
  @{ name = 'icons/maskable-512.png'; size = 512 }
)

$built = @{}
$cornerPixels = 0
foreach ($target in $targets) {
  $bitmap = New-IconBitmap $image $box $target.size
  $cornerPixels += Repair-Corners $bitmap
  Save-Png $bitmap $target.name
  $built[$target.size] = $bitmap
}

$ico = @()
foreach ($size in 16, 32, 48) {
  if ($built.ContainsKey($size)) { $ico += $built[$size] }
  else {
    $bitmap = New-IconBitmap $image $box $size
    $cornerPixels += Repair-Corners $bitmap
    $ico += $bitmap
  }
}
Save-Ico $ico 'favicon.ico'

foreach ($bitmap in $built.Values) { $bitmap.Dispose() }
$image.Dispose()

''
if ($cornerPixels -gt 0) {
  'Corner padding filled with the badge colour so every icon is full bleed.'
} else {
  'No corner padding needed filling; icons are already full bleed.'
}
'{0} icons written.' -f ($targets.Count + 1)
''
