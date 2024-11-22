from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from .jwtcreators import (
    create_access_token,
    create_refresh_token,
)
from .dependencies import (
    get_current_token_payload,
    get_current_auth_user_for_refresh,
    get_current_active_auth_user,
    validate_auth_user_form,
    validate_auth_user_body,
    register_user,
)
from .service import login, verify_code
from ..database import db_manager
from ..users import service, User
from ..users.schemas import User as UserSchema, UserCreate as UserCreateSchema
from .schemas import TokenInfo, LinkTelegramBot, LoginFirstStepMessageResponse

http_bearer = HTTPBearer(auto_error=False)


router = APIRouter(
    prefix="/jwt",
    tags=["JWT"],
)


@router.post("/login/", response_model=TokenInfo, summary="User login", deprecated=True)
async def auth_user_issue_jwt(
    user: UserSchema = Depends(validate_auth_user_form),
):
    """
    Authenticates a user and returns access and refresh token.

    - **username**: User's login/username (required, 6-12 chars, pattern="^[a-z0-9]+$")
    - **password**: User's password (required, 8-16 chars, pattern="^[A-Za-z0-9]+$")
    """
    access_token = await create_access_token(user)
    refresh_token = await create_refresh_token(user)
    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token,
    )


@router.post(
    "/register/", response_model=LinkTelegramBot, summary="User register 1st step"
)
async def register(link_telegram_bot: LinkTelegramBot = Depends(register_user)):
    """
    Registers a user first step.

    - **username**: User's login/username (required, 6-12 chars, pattern="^[a-z0-9]+$")
    - **password**: User's password (required, 8-16 chars, pattern="^[A-Za-z0-9]+$")
    """
    return link_telegram_bot


@router.post(
    "/login-1-step/",
    response_model=LoginFirstStepMessageResponse,
    summary="2FA login 1st step",
)
async def login_1_step(response: LoginFirstStepMessageResponse = Depends(login)):
    """
    Starts login a user and returns {"message": "OK"}.

    - **username**: User's login/username (required, 6-12 chars, pattern="^[a-z0-9]+$")
    - **password**: User's password (required, 8-16 chars, pattern="^[A-Za-z0-9]+$")
    """
    return response


@router.post("/login-2-step/", response_model=TokenInfo, summary="2FA login 2nd step")
async def login_2_step(user: UserSchema = Depends(verify_code)):
    """
    Authenticates a user and returns access and refresh token.

    - **username**: User's login/username (required, 6-12 chars, pattern="^[a-z0-9]+$")
    - **code**: User's code from telegram (required, 6 digits)
    """
    access_token = await create_access_token(user)
    refresh_token = await create_refresh_token(user)
    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token,
    )


@router.post(
    "/refresh/",
    response_model=TokenInfo,
    response_model_exclude_none=True,
    dependencies=[Depends(http_bearer)],
    summary="Refresh JWT token",
)
async def auth_refresh_jwt(
    user: UserSchema = Depends(get_current_auth_user_for_refresh),
):
    """
    Refreshes an access token by refresh token.

    - **refresh_token**: Header bearer refresh token (required)
    """
    if not user.active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Неактивный пользователь",
        )
    access_token = await create_access_token(user)
    return TokenInfo(
        access_token=access_token,
    )
