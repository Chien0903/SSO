"""
Settings for Microsoft Authentication

IMPORTANT: You must register an app in the Azure portal and update these values
with your own credentials before the SSO functionality will work.

See the AZURE_SETUP.md file in the root directory for instructions.
"""

CLIENT_ID=""
CLIENT_SECRET=""
TENANT_ID=""

# Application (client) ID of app registration
CLIENT_ID = "82a5a0e3-52c6-4da9-87cb-c0da9d1c12f7"  # Replace with your Azure app's client ID
# Application's generated client secret
CLIENT_SECRET = "E0D8Q~siCDxI4zP_mCQLuo6xUNYKVBmZyk6MraQG"  # Replace with your Azure app's client secret
# Tenant ID of your Azure AD instance
TENANT_ID = "3b40376f-d4b9-4a1c-a631-1cf88d40cc32"  # Replace with your Azure AD tenant ID

# The base URL for Microsoft's OAuth endpoints
AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"

# The OAuth scope that we're requesting
SCOPE = ["User.Read"]

# The URL where Microsoft will send the user after authentication
REDIRECT_PATH = "/auth/redirect"

# The full absolute URL that Microsoft should redirect to
REDIRECT_URI = "http://localhost:8000/auth/redirect"
