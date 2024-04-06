import stripe
from typing import List
from pydantic import BaseModel
from email_agent_api.lib.log import logger
from email_agent_api import env

stripe.api_key = env.STRIPE_SECRET_KEY


class User(BaseModel):
    email: str
    paid: bool


user_cache: dict[str, User] = {}


def cancel_subscription(email: str):
    subscriptions = _get_subscriptions(email)

    for subscription in subscriptions.data:
        if subscription["status"] == "active":
            try:
                stripe.Subscription.cancel(subscription["id"])
            except:
                pass


def create_checkout_url(email: str) -> str:
    checkout_session = stripe.checkout.Session.create(
        line_items=[
            {
                'price': env.STRIPE_PRICE_ID,
                'quantity': 1,
            },
        ],
        mode='subscription',
        customer_email=email,
        success_url='https://chromewebstore.google.com/detail/' + env.CHROME_EXTENSION_ID,
    )

    return checkout_session.url

def check_if_paid(email: str, use_cache: bool = True) -> bool:
    logger.info("Checking if paid")
    # Check if paid in cache
    if use_cache and email in user_cache:
        user = user_cache[email]
        if user.paid:
            logger.info("User in cache as paid")
            return True
    logger.info("Checking stripe")
    # If not in cache or unpaid in cache, check stripe
    stripe_is_paid = _check_if_paid_on_stripe(email)
    if stripe_is_paid:
        user_cache[email] = User(email=email, paid=True)
    else:
        user_cache[email] = User(email=email, paid=False)
    logger.info("Status from stripe: %s" % stripe_is_paid)
    return stripe_is_paid


def _get_subscriptions(email: str) -> List[stripe.Subscription]:
    # Retrieve the customer associated with the email
    customers = stripe.Customer.list(email=email, limit=1)

    if len(customers) > 0:
        customer = customers.data[0]
    else:
        return False

    # Check if the customer is subscribed to the specified product
    return stripe.Subscription.list(customer=customer.id)


def _check_if_paid_on_stripe(email: str) -> bool:
    """
    Checks if an email is paid on Stripe

    Returns:
        True if email is paid
        False if email is not paid
    """
    try:
        subscriptions = _get_subscriptions(email)

        for subscription in subscriptions.data:
            if subscription["status"] == "active":
                return True
        return False
    except stripe.StripeError as e:
        print(f"Stripe error: {e}")
        return False
