# Microsoft Authenticator SSO Demo

This is a simple Single Sign-On (SSO) demo application using Microsoft Authenticator with a Django backend and React frontend.

## Project Structure

- `backend/`: Django REST API backend
- `frontend/`: React frontend application

## Setup Instructions

### Prerequisites

- Python 3.8+ and pip
- Node.js and npm
- Microsoft Azure account with an app registration

### Backend Setup

1. Navigate to the backend folder:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   .\venv\Scripts\Activate.ps1  # On Windows PowerShell
   ```

3. Install dependencies:
   ```
   pip install django djangorestframework django-cors-headers msal
   ```

4. Configure Microsoft Authentication:
   
   Update the `auth_app/auth_settings.py` file with your Azure AD app registration details:
   - CLIENT_ID: Your Azure AD app's client ID
   - CLIENT_SECRET: Your Azure AD app's client secret
   - TENANT_ID: Your Azure AD tenant ID
   
   You can get these by registering an app in the Azure Portal:
   - Go to https://portal.azure.com
   - Navigate to Azure Active Directory > App registrations > New registration
   - Follow the wizard to create a new app
   - Set the redirect URI to http://localhost:8000/auth/redirect
   - Note the Application (client) ID and Directory (tenant) ID
   - Create a client secret under "Certificates & secrets"

5. Run migrations:
   ```
   python manage.py migrate
   ```

6. Start the Django server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

4. The frontend will be available at http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. Click "Login with Microsoft"
3. Complete the Microsoft authentication process
4. After successful authentication, you'll be redirected back to the application
5. You can now access protected resources and view your profile

## Security Notes

This is a demo application. For production use, you would need to:
- Use HTTPS
- Set up proper CORS and CSRF protection
- Add better error handling
- Store secrets securely
- Add proper authorization checks
# SSO
