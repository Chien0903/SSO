# Start both backend and frontend servers
Write-Host "Starting SSO Demo Application..." -ForegroundColor Green
Write-Host "Opening separate windows for backend and frontend..." -ForegroundColor Cyan

# Start the backend in a new window
Start-Process powershell -ArgumentList "-NoExit -ExecutionPolicy Bypass -File $PSScriptRoot\run_backend.ps1"

# Start the frontend in a new window
Start-Process powershell -ArgumentList "-NoExit -ExecutionPolicy Bypass -File $PSScriptRoot\run_frontend.ps1"

Write-Host "Servers are starting in separate windows." -ForegroundColor Green
Write-Host "Backend URL: http://localhost:8000" -ForegroundColor Yellow
Write-Host "Frontend URL: http://localhost:3000" -ForegroundColor Yellow
Write-Host "IMPORTANT: Make sure to update your Azure AD credentials in backend/auth_app/auth_settings.py before login" -ForegroundColor Red
