from api.messages.message import Message


def get_models():
    return Message("waiting on db retrieval impl edit real time?")


def get_public_message():
    return Message("This is a public message.")


def get_protected_message():
    return Message("This is a protected message.")


def get_admin_message():
    return Message("This is an admin message.")
