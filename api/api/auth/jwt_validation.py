# jwt_validation.py
import os
import jwt.algorithms
import requests
import jwt
from dotenv import load_dotenv
from authlib.jose import JsonWebKey

# Load environment variables from .env file
load_dotenv()

# Step 1: Load OIDC configurations from environment variables
OIDC_ISSUER = os.getenv("OIDC_ISSUER")  # OIDC provider's URL
OIDC_AUDIENCE = os.getenv("OIDC_AUDIENCE")  # API or Client ID
OIDC_JWKS_URL = os.getenv("OIDC_JWKS_URL")  # JWKS URL to fetch public keys


# Step 2: Fetch the JWKS (JSON Web Key Set)
def get_jwks():
    try:
        response = requests.get(OIDC_JWKS_URL)
        response.raise_for_status()  # Raise error if the request fails
        return response.json()  # Return the JWKS as a Python dictionary
    except requests.exceptions.RequestException as e:
        raise ValueError(f"Error fetching JWKS: {str(e)}")


# Step 3: Extract the 'kid' from the JWT
def extract_kid_from_jwt(token):
    try:
        headers = jwt.get_unverified_header(
            token
        )  # Get header without verifying the token
        return headers.get("kid")  # Extract the 'kid' (Key ID) from the header
    except jwt.DecodeError as e:
        raise ValueError("Error decoding the JWT header") from e


# Step 4: Find the correct public key from the JWKS based on the 'kid'
def get_public_key_from_jwks(kid, jwks):
    for key in jwks["keys"]:
        if key["kid"] == kid:
            return jwt.algorithms.RSAAlgorithm.from_jwk(
                key
            )  # Return the matching public key
    raise ValueError(f"No matching key found for 'kid': {kid}")


# Step 5: Verify the JWT signature
def verify_jwt(token):
    try:
        # Fetch the JWKS (public keys) from the OIDC provider
        jwks = get_jwks()

        # Extract the 'kid' (Key ID) from the JWT header
        kid = extract_kid_from_jwt(token)

        # Find the corresponding public key from the JWKS using the 'kid'
        public_key = get_public_key_from_jwks(kid, jwks)

        # Decode and verify the JWT using the RSA public key
        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],  # The algorithm used to sign the JWT
            audience=OIDC_AUDIENCE,
            issuer=OIDC_ISSUER,
        )
        print("succesfully verified payload")

        return payload  # If valid, return the decoded payload

    except jwt.ExpiredSignatureError:
        print("Token has expired")
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError as e:
        print(f"Invalid token: {str(e)}")
        raise ValueError(f"Invalid token: {str(e)}")
    except Exception as e:
        print(f"An error occurred during token verification: {str(e)}")
        raise ValueError(f"An error occurred during token verification: {str(e)}")
