from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

from .auth.router import router as auth_router
from .users.router import router as users_router

from .database import Base
from .config import DEV


origins = ["http://scannerbox.ru", "https://scannerbox.ru", ]
if DEV:
    origins.extend(["http://localhost:3000", "https://localhost:3000"])


app = FastAPI(title="ScannerBox")
main_router = APIRouter(prefix="/api")


@app.exception_handler(Exception)
async def global_exception_handler(_: Request, exc: Exception):
    if DEV:
        return JSONResponse(
            status_code=500,
            content={"message": "Internal Server Error", "details": str(exc)},
        )


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы
    allow_headers=["*"],  # Разрешить все заголовки
)

main_router.include_router(auth_router)
main_router.include_router(users_router)

app.include_router(main_router)
