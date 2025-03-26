import resend
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")


def send_email():
    resend.Emails.send(
        {
            "from": "onboarding@resend.dev",
            "to": "mooscastelijn@gmail.com",
            "subject": "New Model ready for review",
            "html": "<p>Hi Charlotte, A new model is added to the Copernicus Model Atlas and waits for your review!</p>",
        }
    )
