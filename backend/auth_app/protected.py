from functools import wraps
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .views import _get_token_from_cache

def token_required(view_func):
    @wraps(view_func)
    def decorated(request, *args, **kwargs):
        token = _get_token_from_cache(request)
        if not token:
            return JsonResponse({
                "error": "Authentication required",
                "message": "Please login first"
            }, status=401)
        return view_func(request, *args, **kwargs)
    return decorated

@api_view(['GET'])
@token_required
def protected_resource(request):
    """A protected resource requiring authentication"""
    user = request.session.get("user", {})
    return Response({
        "message": f"Hello, {user.get('name', 'User')}! This is a protected resource.",
        "user": user
    })
