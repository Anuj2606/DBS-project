from flask import Blueprint, request, jsonify
from app.models import get_db_connection
from app.utils import verify_password, generate_token
import MySQLdb.cursors

api_blueprint = Blueprint("api", __name__)

# 🛡️ /api/login
@api_blueprint.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    conn = get_db_connection()
    cursor = conn.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user and verify_password(password, user["password_hash"]):
        token = generate_token(user)
        return jsonify({"token": token, "user": user})
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# ⚡ /api/threats
@api_blueprint.route("/threats", methods=["GET", "POST"])
def manage_threats():
    conn = get_db_connection()
    cursor = conn.cursor(MySQLdb.cursors.DictCursor)

    if request.method == "POST":
        data = request.json
        cursor.execute(
            "INSERT INTO threats (threat_name, threat_type, threat_level, description) VALUES (%s, %s, %s, %s)",
            (data["threat_name"], data["threat_type"], data["threat_level"], data["description"]),
        )
        conn.commit()
        return jsonify({"message": "Threat added successfully!"})

    cursor.execute("SELECT * FROM threats")
    threats = cursor.fetchall()
    return jsonify(threats)

# 🚨 /api/incidents
@api_blueprint.route("/incidents", methods=["GET", "POST", "PUT"])
def manage_incidents():
    conn = get_db_connection()
    cursor = conn.cursor(MySQLdb.cursors.DictCursor)

    if request.method == "POST":
        data = request.json
        cursor.execute(
            "INSERT INTO incidents (threat_id, user_id, status, response_action) VALUES (%s, %s, %s, %s)",
            (data["threat_id"], data["user_id"], "Open", data["response_action"]),
        )
        conn.commit()
        return jsonify({"message": "Incident logged successfully!"})

    elif request.method == "PUT":
        data = request.json
        cursor.execute(
            "UPDATE incidents SET status = %s, response_action = %s WHERE incident_id = %s",
            (data["status"], data["response_action"], data["incident_id"]),
        )
        conn.commit()
        return jsonify({"message": "Incident updated successfully!"})

    cursor.execute("SELECT * FROM incidents")
    incidents = cursor.fetchall()
    return jsonify(incidents)


# 📊 /api/reports
@api_blueprint.route("/reports", methods=["GET"])
def get_reports():
    conn = get_db_connection()
    cursor = conn.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("""
        SELECT t.threat_name, i.status, COUNT(i.incident_id) AS incident_count
        FROM incidents i
        JOIN threats t ON i.threat_id = t.threat_id
        GROUP BY t.threat_name, i.status
    """)
    reports = cursor.fetchall()
    return jsonify(reports)

# 🏠 Home Route
@api_blueprint.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Threat Intelligence API!"})
