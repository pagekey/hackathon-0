from fastapi import FastAPI
from email_agent_api.routes import user, generate_email, register

app = FastAPI()

app.include_router(user.router, prefix="/api/user")
app.include_router(register.router, prefix="/api/register")
app.include_router(generate_email.router, prefix="/api/generate")
