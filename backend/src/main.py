from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse


app = FastAPI(title="ScannerBox")
main_router = APIRouter(prefix="/api")

origins = ("http://scannerbox.ru", "https://scannerbox.ru", "http://localhost:3000", "https://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы
    allow_headers=["*"],  # Разрешить все заголовки
)


@app.get("/")
async def index():
    return JSONResponse({"message": "Hello world!"})

