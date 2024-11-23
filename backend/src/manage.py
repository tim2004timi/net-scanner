import argparse
import asyncio
from datetime import timedelta

from src.auth.jwtcreators import create_jwt
from src.config import ACCESS_TOKEN_TYPE
from src.database import db_manager
from sqlalchemy.ext.asyncio import AsyncSession
import random
import string

from src.users import User
from src.utils import hash_password
from src import main


def generate_random_string(length: int = 10) -> str:
    """Генерирует случайную строку из букв и цифр заданной длины."""
    return "".join(random.choices(string.ascii_letters + string.digits, k=length))


async def create_admin_user(session: AsyncSession) -> str:
    """Создает администратора и возвращает access token с большим сроком действия."""
    username = generate_random_string()
    password = generate_random_string()
    tg_username = generate_random_string()

    hashed_password = hash_password(password)

    user = User(
        username=username,
        hashed_password=hashed_password,
        tg_username=tg_username,
        admin=True,
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)

    jwt_payload = {
        "sub": user.id,
        "username": user.username,
        "active": user.active,
        "admin": user.admin,
    }
    access_token = await create_jwt(
        token_type=ACCESS_TOKEN_TYPE,
        token_data=jwt_payload,
        expire_timedelta=timedelta(days=365 * 10),
    )

    # Вывод данных администратора
    print(f"Администратор создан. Токен записан в token.txt")
    print(f"Username: {username}")
    with open("token.txt", "a", encoding="utf-8") as f:
        f.write(access_token)

    return access_token


async def run():
    parser = argparse.ArgumentParser(description="Управление администраторами.")
    parser.add_argument(
        "--createadmin",
        action="store_true",
        help="Создает администратора и возвращает токен.",
    )
    args = parser.parse_args()

    if args.createadmin:
        async with db_manager.session_maker() as session:
            await create_admin_user(session)


if __name__ == "__main__":
    asyncio.run(run())
