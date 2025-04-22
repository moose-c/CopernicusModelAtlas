import resend
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")


def send_email(subject, html):
    return resend.Emails.send(
        {
            "from": "onboarding@resend.dev",
            "to": "copernicus-model-atlas@uu.nl",
            "subject": subject,
            "html": html,
        }
    )
