import bcrypt
import jwt
import datetime

SECRET_KEY = "2c17569d49fcb30a1ab1b5cc415359ac5c5707a400f8b91b433bb33354b7f012"

def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt)

def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))

def generate_token(user):
    payload = {
        "user_id": user["user_id"],
        "username": user["username"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token