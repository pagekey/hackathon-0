import stripe
from email_agent_api.lib.log import logger

from pydantic import BaseModel

from email_agent_api import env

stripe.api_key = env.STRIPE_SECRET_KEY


class User(BaseModel):
    email: str
    paid: bool


user_cache: dict[str, User] = {}


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


def _check_if_paid_on_stripe(email: str) -> bool:
    """
    Checks if an email is paid on Stripe

    Returns:
        True if email is paid
        False if email is not paid
    """
    try:
        # Retrieve the customer associated with the email
        customers = stripe.Customer.list(email=email, limit=1)

        if len(customers) > 0:
            customer = customers.data[0]
        else:
            return False

        # Check if the customer is subscribed to the specified product
        subscriptions = stripe.Subscription.list(customer=customer.id)
        for subscription in subscriptions.data:
            items = subscription["items"]["data"]
            for item in items:
                plan_active = item["price"]["active"]
                price_id = item["price"]["id"]
                if price_id == env.STRIPE_PRICE_ID and plan_active:
                    return True
        return False
    except stripe.StripeError as e:
        print(f"Stripe error: {e}")
        return False
