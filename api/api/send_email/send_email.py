import resend
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")
recipient = os.getenv("RECIPIENT_EMAIL")


def send_email():
    return resend.Emails.send(
        {
            "from": "onboarding@resend.dev",
            "to": recipient,
            "subject": "New Model ready for review",
            "html": "<p>Hi Charlotte, A new model is added to the Copernicus Model Atlas and waits for your review!</p>",
        }
    )
