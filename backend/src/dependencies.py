from enum import Enum

from fastapi import Depends, HTTPException
from starlette import status

from .auth.dependencies import get_current_auth_user
from .users.schemas import User as UserSchema


class Permission(Enum):
    ADMIN = 1
    USER = 2


HTTP_EXCEPTION_403 = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="Нет доступа к данному ресурсу",
)


def check_permission(permission: Permission):
    async def check(user: UserSchema = Depends(get_current_auth_user)):
        if permission == Permission.ADMIN and not user.admin:
            raise HTTP_EXCEPTION_403
        if permission == Permission.USER and not user:
            raise HTTP_EXCEPTION_403
        
    return check
