import resend
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")
recipient = os.getenv("RECIPIENT_EMAIL")


def send_email_approval():
    return resend.Emails.send(
        {
            "from": "onboarding@resend.dev",
            "to": recipient,
            "subject": "New Model ready for review",
            "html": "<p>Hi Charlotte, A new model is added to the Copernicus Model Atlas and waits for your review!</p>",
        }
    )


def send_email_request_access(model_name, user_id):
    return resend.Emails.send(
        {
            "from": "onboarding@resend.dev",
            "to": recipient,
            "subject": "Someone requested access",
            "html": f"<p>Hi Charlotte, the user with id {user_id} requested edit access to {model_name}.</p>",
        }
    )


def send_email(subject, html):
    return resend.Emails.send(
        {
            "from": "onboarding@resend.dev",
            "to": recipient,
            "subject": subject,
            "html": html,
        }
    )
