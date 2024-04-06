from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from email_agent_api.routes import user, generate_email, register

app = FastAPI()

origins = [
    "https://mail.google.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/api/user")
app.include_router(register.router, prefix="/api/register")
app.include_router(generate_email.router, prefix="/api/generate")
