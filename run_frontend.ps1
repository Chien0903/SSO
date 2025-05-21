# Start the React frontend server
Write-Host "Starting React frontend..." -ForegroundColor Cyan
cd "$PSScriptRoot\frontend"

# Check if node_modules exists, if not run npm install
if (-not (Test-Path ".\node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the React development server
Write-Host "Starting React development server..." -ForegroundColor Green
Write-Host "The frontend will be available at http://localhost:3000" -ForegroundColor Cyan
npm start
