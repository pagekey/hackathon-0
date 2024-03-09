import stripe

from pydantic import BaseModel

# TODO use import from env
from dotenv import load_dotenv
load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

class User(BaseModel):
    email: str
    paid: bool

user_cache: dict[str, User] = {}

def check_if_paid(email: str):
    # Check if paid in cache
    if email in user_cache:
        user = user_cache[email]
        if user.paid:
            return True
        else:
            # If not in cache or unpaid in cache, check stripe
            return _check_if_paid_on_stripe(email)

def _check_if_paid_on_stripe(email: str):
    """
    Checks if an email is paid on Stripe

    Returns:
        True if email is paid
        False if email is not paid
    """
    breakpoint()
    try:
        # Retrieve the customer associated with the email
        customer = stripe.Customer.list(email=email, limit=1).data[0]

        # Check if the customer is subscribed to the specified product
        subscriptions = stripe.Subscription.list(customer=customer.id)
        for subscription in subscriptions.data:
            if subscription.items and subscription.items.data[0].price.product == product_id:
                return True

        return False
    except stripe.error.StripeError as e:
        print(f"Stripe error: {e}")
        return False

if __name__ == "__main__":
    _check_if_paid_on_stripe("yeet@yeet.net")