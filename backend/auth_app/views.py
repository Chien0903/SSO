"""
Views for handling Microsoft SSO authentication
"""
import msal
import requests
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import auth_settings

def _load_cache(request):
    """Load the session cache"""
    cache = msal.SerializableTokenCache()
    if request.session.get('token_cache'):
        cache.deserialize(request.session['token_cache'])
    return cache

def _save_cache(request, cache):
    """Save the cache back to session"""
    if cache.has_state_changed:
        request.session['token_cache'] = cache.serialize()

def _build_msal_app(cache=None):
    """Build the MSAL application object"""
    return msal.ConfidentialClientApplication(
        auth_settings.CLIENT_ID,
        authority=auth_settings.AUTHORITY,
        client_credential=auth_settings.CLIENT_SECRET,
        token_cache=cache
    )

def _get_token_from_cache(request, scopes=None):
    """Get token from cache"""
    cache = _load_cache(request)
    app = _build_msal_app(cache)
    accounts = app.get_accounts()
    if accounts:
        result = app.acquire_token_silent(
            scopes or auth_settings.SCOPE, account=accounts[0])
        _save_cache(request, cache)
        return result
    return None

@api_view(['GET'])
def login(request):
    """Initiate the login flow"""
    app = _build_msal_app()
    auth_url = app.get_authorization_request_url(
        auth_settings.SCOPE,
        redirect_uri=auth_settings.REDIRECT_URI,
        state=request.GET.get('next', '/'),
        prompt="select_account"
    )
    return Response({"auth_url": auth_url})

@api_view(['GET'])
def logout(request):
    """Logout the user"""
    request.session.clear()
    return Response({"message": "Successfully logged out"})

@api_view(['GET'])
def redirect_view(request):
    """Handle the authentication response"""
    if 'error' in request.GET:
        return JsonResponse({
            'error': request.GET['error'],
            'error_description': request.GET.get('error_description', '')
        }, status=400)
    
    if 'code' in request.GET:
        cache = _load_cache(request)
        app = _build_msal_app(cache)
        
        # Get the token using the authorization code
        result = app.acquire_token_by_authorization_code(
            request.GET['code'],
            scopes=auth_settings.SCOPE,
            redirect_uri=auth_settings.REDIRECT_URI
        )
        
        if "error" in result:
            return JsonResponse({
                'error': result['error'],
                'error_description': result.get('error_description', '')
            }, status=400)
        
        # Save the token cache in the session
        _save_cache(request, cache)
        
        # Save the user info in the session
        user_info = result.get('id_token_claims')
        request.session['user'] = {
            'name': user_info.get('name', ''),
            'email': user_info.get('preferred_username', ''),
            'id': user_info.get('oid', '')
        }
        
        # Redirect to frontend with token
        frontend_url = 'http://localhost:3000/auth/callback'
        access_token = result.get('access_token', '')
        
        return HttpResponseRedirect(f"{frontend_url}?token={access_token}")
    
    return JsonResponse({"error": "No code provided"}, status=400)

@api_view(['GET'])
def user_info(request):
    """Get the current user's info"""
    token = _get_token_from_cache(request, auth_settings.SCOPE)
    
    if not token:
        return Response({"authenticated": False})
    
    # Get user data from Microsoft Graph
    graph_data = requests.get(
        "https://graph.microsoft.com/v1.0/me",
        headers={'Authorization': f"Bearer {token['access_token']}"},
    ).json()
    
    return Response({
        "authenticated": True,
        "user": request.session.get("user", {}),
        "graph_data": graph_data
    })

@api_view(['GET'])
def check_auth(request):
    """Check if the user is authenticated"""
    token = _get_token_from_cache(request)
    return Response({
        "authenticated": token is not None,
        "user": request.session.get("user", {}) if token else None
    })
