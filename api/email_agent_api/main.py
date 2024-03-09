from fastapi import FastAPI

app = FastAPI()


@app.get("/api/generate")
def generate_email() -> dict[str, str]:
    return {"Hello": "World"}


@app.get("/api/register")
def register_user() -> dict[str, str]:
    return {"Hello": "World"}


@app.get("/api/user")
def get_user_status() -> dict[str, str]:
    return {"Hello": "World"}
