from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


@app.post("/api/generate")
def generate_email() -> dict[str, str]:
    return {"email": "Hey Mr. Smith, here is your receipt"}


@app.post("/api/register")
def register_user() -> dict[str, str]:
    return {"token": "some-api-token"}


@app.get("/api/user")
def get_user_status() -> dict[str, str]:
    return {"status": "PAID"}
