param(
  [string]$DataDir = '',
  [string]$BinDir = '',
  [string]$Dump = '',
  [switch]$Restore,
  [switch]$WhatIfOnly
)

$ErrorActionPreference = 'Stop'

if (-not $BinDir) {
  $found = Get-ChildItem 'C:\Program Files\PostgreSQL' -Directory -ErrorAction SilentlyContinue |
    Where-Object { Test-Path (Join-Path $_.FullName 'bin\psql.exe') } |
    Sort-Object { [int]($_.Name -replace '\D', '') } -Descending |
    Select-Object -First 1
  if (-not $found) { Write-Host 'ERROR: no PostgreSQL installation found under "C:\Program Files\PostgreSQL".' -ForegroundColor Red; exit 1 }
  $BinDir = Join-Path $found.FullName 'bin'
  Write-Host "Using PostgreSQL $($found.Name) at $BinDir"
}

if (-not $DataDir) { $DataDir = Join-Path (Split-Path $BinDir -Parent) 'data' }

if (-not (Test-Path (Join-Path $BinDir 'psql.exe'))) { Write-Host "ERROR: psql.exe not found in $BinDir" -ForegroundColor Red; exit 1 }
if (-not (Test-Path $DataDir)) { Write-Host "ERROR: data directory not found: $DataDir" -ForegroundColor Red; exit 1 }

$DbName   = 'fasterfood'
$AppRole  = 'ffapp'
$Hostname = '127.0.0.1'
$Port     = 5432
$Backups  = Join-Path $PSScriptRoot 'backups'

$psql = Join-Path $BinDir 'psql.exe'
$pgRestore = Join-Path $BinDir 'pg_restore.exe'

function Write-Step($msg) { Write-Host "  $msg" }
function Write-Changed($msg) { Write-Host "  CHANGED: $msg" -ForegroundColor Yellow }
function Write-Same($msg) { Write-Host "  ok (already correct): $msg" -ForegroundColor DarkGray }
function Write-Fail($msg) { Write-Host "  ERROR: $msg" -ForegroundColor Red }

function Backup-File($path) {
  if (-not (Test-Path $Backups)) { New-Item -ItemType Directory -Path $Backups -Force | Out-Null }
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  $dest = Join-Path $Backups ((Split-Path $path -Leaf) + ".$stamp.bak")
  Copy-Item $path $dest -Force
  Write-Host "  backup: $dest" -ForegroundColor DarkGray
}

function Invoke-Psql {
  param([string]$Sql, [string]$Database = 'postgres', [string]$User = 'postgres')
  $out = & $psql -h $Hostname -p $Port -U $User -d $Database -t -A -c $Sql 2>&1
  if ($LASTEXITCODE -ne 0) { throw "psql failed: $($out -join ' ')" }
  return ($out | Out-String).Trim()
}

function Set-PostgresqlConf {
  $path = Join-Path $DataDir 'postgresql.conf'
  if (-not (Test-Path $path)) { throw "not found: $path" }
  if ($WhatIfOnly) {
    $has = Select-String -Path $path -Pattern "^\s*listen_addresses\s*=" | Select-Object -First 1
    if ($has) { Write-Same "listen_addresses is already '$($has.Line.Split('=')[1].Trim())'" }
    else { Write-Changed "listen_addresses is not set; would add localhost" }
    return
  }
  $lines = Get-Content $path
  $found = $false
  $updated = foreach ($line in $lines) {
    if ($line -match '^\s*listen_addresses\s*=') {
      if (-not $found) { $found = $true; "listen_addresses = 'localhost'" } else { $line }
    } else { $line }
  }
  if (-not $found) { $updated = @($updated) + "listen_addresses = 'localhost'" }
  $result = ($updated -join "`r`n")
  if ($result -eq ($lines -join "`r`n")) { Write-Same 'listen_addresses = localhost' }
  else {
    Backup-File $path
    Set-Content -Path $path -Value $result -Encoding ASCII
    Write-Changed 'listen_addresses = localhost'
    $script:PgConfChanged = $true
  }
}

function Set-PgHbaConf {
  $path = Join-Path $DataDir 'pg_hba.conf'
  if (-not (Test-Path $path)) { throw "not found: $path" }
  $lines = Get-Content $path
  $report = @()
  $updated = [System.Collections.ArrayList]::new()
  foreach ($line in $lines) { [void]$updated.Add($line) }

  foreach ($addr in @('127.0.0.1/32', '::1/128')) {
    $re = "^host\s+all\s+all\s+$([regex]::Escape($addr))\s+\S+"
    $index = -1
    for ($i = 0; $i -lt $updated.Count; $i++) {
      if ($updated[$i] -match $re) { $index = $i; break }
    }
    if ($WhatIfOnly) {
      if ($index -ge 0) { Write-Same "pg_hba trust for $addr" }
      else { Write-Changed "pg_hba has no 127.0.0.1 rule for $addr; would add trust" }
      continue
    }
    if ($index -ge 0) {
      $replaced = $updated[$index] -replace "(\s+)\S+\s*$", "`$1trust"
      if ($replaced -ne $updated[$index]) { $updated[$index] = $replaced }
    } else {
      [void]$updated.Add(('host    all             all             {0,-20}trust' -f $addr))
    }
  }
  if (-not $WhatIfOnly) {
    $result = ($updated -join "`r`n")
    if ($result -eq ($lines -join "`r`n")) { Write-Same 'pg_hba.conf trust rules' }
    else {
      Backup-File $path
      Set-Content -Path $path -Value $result -Encoding ASCII
      Write-Changed 'pg_hba.conf trust rules for 127.0.0.1 and ::1'
      $script:PgConfChanged = $true
    }
  }
}

function Test-Role {
  $out = Invoke-Psql -Sql "SELECT 1 FROM pg_roles WHERE rolname='$AppRole'"
  return ($out -eq '1')
}

function Test-Database {
  $out = Invoke-Psql -Sql "SELECT 1 FROM pg_database WHERE datname='$DbName'"
  return ($out -eq '1')
}

$script:PgConfChanged = $false

Write-Host ''
Write-Host 'PostgreSQL configuration'
Set-PostgresqlConf
Set-PgHbaConf

if ($script:PgConfChanged) {
  Write-Host ''
  Write-Step 'Configuration changed - PostgreSQL must be restarted for it to take effect.'
  if ($WhatIfOnly) { exit 0 }
  Restart-Service -Name 'postgresql-x64-18' -Force
  Start-Sleep -Seconds 4
  Write-Step 'PostgreSQL restarted.'
} else {
  Write-Host ''
  Write-Step 'Configuration already correct, no restart needed.'
}

if ($WhatIfOnly) { exit 0 }

Write-Host ''
Write-Host 'Database and role provisioning'

$needsPassword = $false
try { [void](Invoke-Psql -Sql 'SELECT 1') } catch { $needsPassword = $true }

if ($needsPassword) {
  Write-Step 'PostgreSQL requires the superuser password.'
  $env:PGPASSWORD = Read-Host '  Password for the "postgres" superuser'
  Invoke-Psql -Sql 'SELECT 1' | Out-Null
  Write-Step 'Password accepted.'
  $script:PasswordWasSet = $true
} else {
  Write-Step 'Superuser access is passwordless (trust auth on localhost).'
  $script:PasswordWasSet = $false
}

if (Test-Role) {
  Write-Step "Role '$AppRole' already exists."
} else {
  Invoke-Psql -Sql "CREATE ROLE $AppRole LOGIN" | Out-Null
  Write-Changed "Role '$AppRole' created."
}

if (Test-Database) {
  Write-Step "Database '$DbName' already exists."
} else {
  Invoke-Psql -Sql "CREATE DATABASE $DbName OWNER $AppRole" | Out-Null
  Write-Changed "Database '$DbName' created (owner $AppRole)."
}

if ($script:PasswordWasSet) { $env:PGPASSWORD = $null }

if ($Restore) {
  Write-Host ''
  Write-Host 'Restoring data from dump'
  if (-not (Test-Path $Dump)) { throw "dump not found: $Dump" }
  Write-Step "Source: $Dump"
  & $pgRestore -h $Hostname -p $Port -U $AppRole -d $DbName --clean --if-exists --no-owner $Dump
  if ($LASTEXITCODE -ne 0) { throw "pg_restore failed with exit code $LASTEXITCODE" }
  $count = Invoke-Psql -Sql "SELECT count(*) FROM app_data" -Database $DbName -User $AppRole
  Write-Changed "Restored. app_data now holds $count key(s)."
} else {
  Write-Host ''
  Write-Same 'No dump supplied, skipping restore.'
}

Write-Host ''
Write-Host 'PostgreSQL setup finished.'
exit 0
