# Microsoft Authenticator SSO Demo - Quick Start Guide

## First Time Setup

1. **Check Requirements**
   ```
   .\check_requirements.ps1
   ```
   Make sure Python, Node.js, and npm are installed.

2. **Register an Azure AD Application**
   - Follow the step-by-step guide in `AZURE_SETUP.md`
   - Get your Client ID, Client Secret, and Tenant ID

3. **Configure Azure Credentials**
   - Open `backend/auth_app/auth_settings.py`
   - Replace placeholder values with your Azure app credentials:
     ```python
     CLIENT_ID = "your-client-id-here"
     CLIENT_SECRET = "your-client-secret-here"
     TENANT_ID = "your-tenant-id-here"
     ```

## Running the Demo

1. **Start Both Servers**
   ```
   .\run_demo.ps1
   ```
   This will open two terminal windows, one for the Django backend and one for the React frontend.

2. **Access the Application**
   - Open your browser and go to: http://localhost:3000

3. **Test the Authentication Flow**
   - Click "Login with Microsoft"
   - Complete the Microsoft authentication
   - Explore the protected resources and your profile

## Documentation

- `README.md` - General project information
- `USER_GUIDE.md` - Detailed usage instructions
- `AZURE_SETUP.md` - How to register an app in Azure AD

## Troubleshooting

If you encounter any issues:
- Make sure both servers are running
- Verify your Azure app credentials are correctly set
- Check that your Azure app's redirect URI is set to `http://localhost:8000/auth/redirect`
