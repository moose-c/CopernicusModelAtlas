import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Step 1: Load OIDC configurations from environment variables
OIDC_INTROSPECTION_URL = os.getenv("OIDC_INTROSPECTION_URL")
OIDC_CLIENT_ID = os.getenv("OIDC_CLIENT_ID")
OIDC_CLIENT_SECRET = os.getenv("OIDC_CLIENT_SECRET")


# Step 2: Introspect the opaque access token
def introspect_token(token):
    try:
        response = requests.post(
            OIDC_INTROSPECTION_URL,
            data={
                "token": token,
                "client_id": OIDC_CLIENT_ID,
                "client_secret": OIDC_CLIENT_SECRET,
            },
            headers={
                "Content-Type": "application/x-www-form-urlencoded",
            },
        )

        response.raise_for_status()  # Raise error if the request fails

        # Get the response in JSON format
        introspection_data = response.json()

        # Check if the token is active
        if introspection_data.get("active"):
            return introspection_data  # Return the token details (payload-like data)
        else:
            print("Token is not valid or expired")
            raise ValueError("Invalid or expired token")

    except requests.exceptions.RequestException as e:
        print(f"Error during introspection request: {str(e)}")
        raise ValueError("Error during introspection request") from e
    except ValueError as e:
        print(str(e))
        raise
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise ValueError(f"An error occurred during token validation: {str(e)}")
