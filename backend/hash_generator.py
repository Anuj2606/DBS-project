import bcrypt

password = "admin"  # Your desired password
salt = bcrypt.gensalt()
hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
print(hashed_password.decode("utf-8"))
