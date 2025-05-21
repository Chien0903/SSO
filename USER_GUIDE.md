# How to Run and Test This Demo

## Overview

This project demonstrates Single Sign-On (SSO) using Microsoft Authenticator with:
- **Backend**: Django REST API
- **Frontend**: React application

The demo allows users to:
1. Login with Microsoft account
2. View their profile information
3. Access protected resources
4. Log out

## Running the Application

### Option 1: Using the convenience script (Recommended)

1. Run the all-in-one script:
   ```
   .\run_demo.ps1
   ```
   This will start both backend and frontend in separate terminal windows.

### Option 2: Running manually

1. Start the backend:
   ```
   .\run_backend.ps1
   ```

2. In a separate terminal, start the frontend:
   ```
   .\run_frontend.ps1
   ```

## Setting Up Microsoft Authentication

Before testing the authentication flow, you **must** set up your Microsoft Azure AD application:

1. Follow the instructions in `AZURE_SETUP.md` to create an app registration in Azure
2. Update the following values in `backend/auth_app/auth_settings.py`:
   - CLIENT_ID
   - CLIENT_SECRET
   - TENANT_ID

## Testing the Application

1. Open your browser and navigate to http://localhost:3000
2. Click the "Login with Microsoft" button
3. You will be redirected to the Microsoft login page
4. Sign in with your Microsoft account
5. After successful authentication, you'll be redirected back to the application
6. You can now:
   - View your profile (shows information from Microsoft Graph API)
   - Access the protected resource
   - Log out

## Troubleshooting

If you encounter issues:

1. **Authentication fails or redirects incorrectly**:
   - Verify your Azure AD app settings
   - Check that the redirect URI in Azure matches `http://localhost:8000/auth/redirect`
   - Ensure CLIENT_ID, CLIENT_SECRET, and TENANT_ID are correct

2. **CORS errors**:
   - Make sure both backend and frontend are running
   - Verify the CORS settings in `backend/sso_project/settings.py`

3. **Backend errors**:
   - Check the terminal running the backend for error messages
   - Make sure all required packages are installed

4. **Frontend errors**:
   - Check the browser console for JavaScript errors
   - Make sure all required npm packages are installed
