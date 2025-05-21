# Azure AD App Registration Guide

This guide will help you set up a new app registration in Azure Active Directory (Azure AD) for use with this SSO demo.

## Steps to Register an App in Azure AD

1. **Sign in to Azure Portal**
   - Go to [Azure Portal](https://portal.azure.com)
   - Log in with your Microsoft account

2. **Navigate to Azure Active Directory**
   - From the left menu, select "Azure Active Directory"

3. **Navigate to App Registrations**
   - From the Azure AD left menu, select "App registrations"
   - Click "+ New registration"

4. **Register your application**
   - **Name**: Enter a name for your application (e.g., "SSO Demo")
   - **Supported account types**: Choose "Accounts in this organizational directory only" (for single tenant) or "Accounts in any organizational directory" (for multi-tenant)
   - **Redirect URI**:
     - Select "Web" from the platform dropdown
     - Enter `http://localhost:8000/auth/redirect`
   - Click "Register"

5. **Note Application (client) ID and Directory (tenant) ID**
   - After registration, you'll be taken to the app's overview page
   - Copy the "Application (client) ID" - this will be your `CLIENT_ID`
   - Copy the "Directory (tenant) ID" - this will be your `TENANT_ID`

6. **Create a client secret**
   - From the left menu, select "Certificates & secrets"
   - Under "Client secrets", click "+ New client secret"
   - Add a description and select an expiration period
   - Click "Add"
   - Immediately copy the secret value (it will only be shown once) - this will be your `CLIENT_SECRET`

7. **Configure API permissions**
   - From the left menu, select "API permissions"
   - Click "+ Add a permission"
   - Select "Microsoft Graph"
   - Select "Delegated permissions"
   - Search for and select the following permissions:
     - User.Read (to get basic user info)
   - Click "Add permissions"
   - Click "Grant admin consent" (if you're an admin)

8. **Update your application settings**
   - Open `backend/auth_app/auth_settings.py`
   - Replace the placeholder values with your actual values:
     ```python
     CLIENT_ID = "your-client-id"
     CLIENT_SECRET = "your-client-secret"
     TENANT_ID = "your-tenant-id"
     ```

Your Azure AD app is now configured for use with this SSO demo!

## Testing Your Configuration

After updating your app settings, start both the backend and frontend servers and test the login flow. You should be redirected to Microsoft's authentication page and, after successful login, back to your application.
