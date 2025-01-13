from api.messages.message import Message


def get_public_message():
    return Message("This is a public messag.")


def get_protected_message():
    return Message("This is a protected message.")


def get_admin_message():
    return Message("This is an admin message.")
