from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel
from pathlib import Path


BASE_DIR = Path(__file__).parent.parent

DEV = True  # TODO: изменить

TOKEN_TYPE_FIELD = "type"
ACCESS_TOKEN_TYPE = "access"
REFRESH_TOKEN_TYPE = "refresh"
BOT_URL = "t.me/ScannerBoxBot" if not DEV else "t.me/TimohaStudyTestBot"
SCAN_SERVICE_URL = "http://localhost:7000"


class Settings(BaseSettings):
    db_user: str
    db_pass: str
    db_host: str
    db_port: str
    db_name: str
    db_echo: bool
    bot_token: str

    model_config = SettingsConfigDict(env_file=".env")


class AuthSettings(BaseModel):
    algorithm: str = "RS256"
    private_key_path: Path = BASE_DIR / "certs" / "jwt-private.pem"
    public_key_path: Path = BASE_DIR / "certs" / "jwt-public.pem"
    access_token_expire_minutes: int = 4  # TODO: изменить
    refresh_token_expire_days: int = 1
    tg_bot_code_expire_seconds: int = 120
    tg_bot_code_max_attempts: int = 3
    tg_confirm_expire_seconds: int = 60 * 5


settings = Settings()
auth_settings = AuthSettings()
