import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY: str = os.environ["OPENAI_API_KEY"]
STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY")
STRIPE_PRICE_ID: str = os.getenv('STRIPE_PRICE_ID')
