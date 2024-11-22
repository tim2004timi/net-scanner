from pydantic import BaseModel, Field


class TokenInfo(BaseModel):
    access_token: str
    refresh_token: str | None = None
    token_type: str = "Bearer"


class LoginRequest(BaseModel):
    username: str = Field(
        ...,
        min_length=6,
        max_length=12,
        pattern="^[a-z0-9]+$",
    )
    password: str = Field(
        ...,
        min_length=8,
        max_length=16,
        pattern="^[A-Za-z0-9]+$",
    )


class RegisterRequest(LoginRequest):
    pass


class VerifyCodeRequest(BaseModel):
    username: str
    code: str


class LinkTelegramBot(BaseModel):
    url: str
    expire_seconds: int
    unique_token: str
