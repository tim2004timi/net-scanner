import asyncio

from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
import logging

from .auth.router import router as auth_router
from .scheduler import scheduler
from .tasks import monitor_keep_alive_host_scans
from .users.router import router as users_router
from .assets.router import router as assets_router
from .host_scans.router import router as host_scans_router
from .vulnerability_scans.router import router as vulnerability_scans_router

from .database import Base, db_manager
from .config import DEV, setup_logging


origins = [
    "http://scannerbox.ru",
    "https://scannerbox.ru",
]
if DEV:
    origins.extend(["http://localhost:3000", "https://localhost:3000"])

app = FastAPI(
    title="ScannerBox API",
    description="API for scanning network platform ScannerBox",
    version="1.0",
)
main_router = APIRouter(prefix="/api")

setup_logging()
logger = logging.getLogger("app")


@app.on_event("startup")
async def startup_event():
    scheduler.start()
    asyncio.create_task(monitor_keep_alive_host_scans(db_manager.session_maker))


@app.on_event("shutdown")
async def shutdown_event():
    scheduler.shutdown()


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
main_router.include_router(assets_router)
main_router.include_router(host_scans_router)
main_router.include_router(vulnerability_scans_router)

app.include_router(main_router)
