$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$GhExe = @(
    "C:\Program Files\GitHub CLI\gh.exe",
    "$env:LOCALAPPDATA\Programs\GitHub CLI\gh.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $GhExe) {
    Write-Error "GitHub CLI fehlt. Installieren: winget install GitHub.cli"
}

if (-not (Test-Path ".git")) {
    git init -b main
}

git add app-ads.txt index.html impressum.html css apps play-store-urls.txt deploy.ps1 enable-pages.ps1
$status = git status --porcelain
if ($status) {
    git commit -m "Add developer hub with app legal pages"
}

$repoExists = $false
try {
    & $GhExe repo view craftedcodelabs-ui/craftedcodelabs-ui.github.io *> $null
    if ($LASTEXITCODE -eq 0) { $repoExists = $true }
} catch {
    $repoExists = $false
}

if (-not $repoExists) {
    & $GhExe repo create craftedcodelabs-ui.github.io --public --source=. --remote=origin --push
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
} else {
    if (-not (git remote get-url origin 2>$null)) {
        git remote add origin https://github.com/craftedcodelabs-ui/craftedcodelabs-ui.github.io.git
    }
    git push -u origin main
}

Write-Host ""
Write-Host "Live:" -ForegroundColor Green
Write-Host "  https://craftedcodelabs-ui.github.io/app-ads.txt"
