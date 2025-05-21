# Start the Django backend server
Write-Host "Activating Python virtual environment..." -ForegroundColor Cyan
cd "$PSScriptRoot\backend"

# Check if the virtual environment exists, if not create it
if (-not (Test-Path ".\venv\Scripts\Activate.ps1")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate the virtual environment
.\venv\Scripts\Activate.ps1

# Install or update required packages
Write-Host "Installing required packages from requirements.txt..." -ForegroundColor Cyan
pip install -r requirements.txt

# Run migrations if db.sqlite3 doesn't exist
if (-not (Test-Path ".\db.sqlite3")) {
    Write-Host "Running initial database migrations..." -ForegroundColor Yellow
    python manage.py migrate
}

# Start the Django server
Write-Host "Starting Django server..." -ForegroundColor Green
Write-Host "The backend will be available at http://localhost:8000" -ForegroundColor Cyan
python manage.py runserver
