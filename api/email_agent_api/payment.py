import stripe


def check_if_paid_on_stripe(email: str):
    """
    Checks if an email is paid on Stripe

    Returns:
        True if email is paid
        False if email is not paid
    """
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
