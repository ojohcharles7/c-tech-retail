# ============================================================
#  FasterFood POS - connect address
#
#  Finds the IPv4 address other devices on the network use to
#  reach this PC, and publishes it as connect.json.
#
#  Called by setup-admin.cmd and by start-pos.cmd so the address
#  is worked out in exactly one place.
#
#  Usage:
#     connect-info.ps1 [-Port 5501] [-WriteFile <path>]
#
#  Prints one line of JSON to stdout, or just the IP address
#  when -WriteFile is used. Warnings go to stderr so they stay
#  out of what the caller captures with "for /f".
# ============================================================

param(
  [int]$Port = 5501,
  [string]$WriteFile = ''
)

$ErrorActionPreference = 'SilentlyContinue'

# Tethering and virtual adapters. A phone on USB sharing reports
# "Remote NDIS based Internet Sharing Device" and will hand out a
# perfectly good address that dies the moment the phone is
# unplugged, so it must never win.
$excluded = 'NDIS|Internet Sharing|Tether|Phone Link|Hyper-V|VMware|VirtualBox|Tunnels|TAP|WireGuard|OpenVPN|Wintun|Loopback|Bluetooth'

function Test-PrivateAddress([string]$address) {
  if ($address -like '10.*') { return $true }
  if ($address -like '192.168.*') { return $true }
  if ($address -match '^172\.(1[6-9]|2\d|3[01])\.') { return $true }
  return $false
}

function Get-Candidates {
  $out = @()
  foreach ($config in (Get-NetIPConfiguration)) {
    $desc = [string]$config.NetAdapter.InterfaceDescription
    $name = [string]$config.NetAdapter.Name
    if ($config.NetAdapter.Status -ne 'Up') { continue }

    foreach ($addr in $config.IPv4Address) {
      $ip = [string]$addr.IPAddress
      if (-not $ip) { continue }
      if ($ip -like '127.*' -or $ip -like '169.254.*') { continue }

      $score = 5
      if ($name -match $excluded -or $desc -match $excluded) { $score = 40 }
      elseif ($name -match 'Wi-Fi|Wireless|802\.11|Ethernet') { $score = 0 }
      else { $score = 10 }

      if (-not (Test-PrivateAddress $ip)) { $score += 20 }

      $out += [pscustomobject]@{ address = $ip; score = $score; name = $name; link = [bool]$config.IPv4DefaultGateway }
    }
  }
  return ($out | Sort-Object score, address)
}

$all = Get-Candidates
if (-not $all) { $all = @([pscustomobject]@{ address = 'localhost'; score = 0; name = ''; link = $false }) }

$primary = $all[0]
$chosen = $primary.address

# Two usable addresses on the same subnet is genuinely ambiguous, so
# say so on stderr rather than silently picking one.
$subnet = $chosen -replace '\.\d+$', ''
$sameSubnet = @($all | Where-Object { $_.address -ne $chosen -and $_.address -like "$subnet.*" })
foreach ($other in $sameSubnet) {
  Write-Warning ("another adapter on ${subnet}.0/24 also answers for this PC: $($other.address) ($($other.name)) - using $($other.address) on $($primary.name)")
}

$info = [ordered]@{
  ip         = $chosen
  port       = $Port
  url        = "http://${chosen}:$Port"
  localUrl   = "http://localhost:$Port"
  host       = $env:COMPUTERNAME
  adapter    = $primary.name
  candidates = @($all | ForEach-Object { $_.address })
  updatedAt  = (Get-Date).ToString('o')
}

if ($WriteFile) {
  Set-Content -Path $WriteFile -Value ($info | ConvertTo-Json -Compress) -Encoding UTF8
  Write-Output $chosen
} else {
  Write-Output ($info | ConvertTo-Json -Compress)
}
