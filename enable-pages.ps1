$ErrorActionPreference = "Stop"
$GhExe = @(
    "C:\Program Files\GitHub CLI\gh.exe",
    "$env:LOCALAPPDATA\Programs\GitHub CLI\gh.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $GhExe) { throw "gh not found" }

try {
    & $GhExe api repos/craftedcodelabs-ui/craftedcodelabs-ui.github.io/pages -X POST `
        -f build_type=legacy `
        -f "source[branch]=main" `
        -f "source[path]=/"
} catch {
    Write-Host "Pages maybe already enabled: $_"
}

& $GhExe api repos/craftedcodelabs-ui/craftedcodelabs-ui.github.io/pages
