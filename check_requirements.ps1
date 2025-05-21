# Check if the required tools are installed
Write-Host "Checking if required tools are installed..." -ForegroundColor Cyan

$checkResult = @{
    Python = $false
    Node = $false
    Npm = $false
}

# Check Python
try {
    $pythonVersion = python --version
    if ($pythonVersion -match "Python (\d+\.\d+\.\d+)") {
        $version = $Matches[1]
        $checkResult.Python = $true
        Write-Host "✅ Python version $version is installed." -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Python is not installed or not in PATH." -ForegroundColor Red
}

# Check Node.js
try {
    $nodeVersion = node --version
    if ($nodeVersion -match "v(\d+\.\d+\.\d+)") {
        $version = $Matches[1]
        $checkResult.Node = $true
        Write-Host "✅ Node.js version $version is installed." -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Node.js is not installed or not in PATH." -ForegroundColor Red
}

# Check npm
try {
    $npmVersion = npm --version
    if ($npmVersion -match "(\d+\.\d+\.\d+)") {
        $version = $npmVersion
        $checkResult.Npm = $true
        Write-Host "✅ npm version $version is installed." -ForegroundColor Green
    }
} catch {
    Write-Host "❌ npm is not installed or not in PATH." -ForegroundColor Red
}

# Summary
Write-Host "`nSummary:" -ForegroundColor Cyan
if ($checkResult.Python -and $checkResult.Node -and $checkResult.Npm) {
    Write-Host "✅ All required tools are installed! You can run the demo." -ForegroundColor Green
    Write-Host "ℹ️ Run .\run_demo.ps1 to start both backend and frontend servers." -ForegroundColor Cyan
} else {
    Write-Host "❌ Some required tools are missing." -ForegroundColor Red
    
    if (-not $checkResult.Python) {
        Write-Host "  - Please install Python from https://www.python.org/downloads/" -ForegroundColor Yellow
    }
    
    if (-not $checkResult.Node -or -not $checkResult.Npm) {
        Write-Host "  - Please install Node.js (includes npm) from https://nodejs.org/" -ForegroundColor Yellow
    }
}

Write-Host "`nℹ️ IMPORTANT: Don't forget to set up your Azure AD app and update the credentials in backend/auth_app/auth_settings.py" -ForegroundColor Yellow
