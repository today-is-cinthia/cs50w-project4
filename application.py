import os

from flask import Flask, session, flash, redirect, render_template, request, session, url_for, jsonify
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from dotenv import load_dotenv
from werkzeug.security import check_password_hash, generate_password_hash
from loginrequired import login_required
import json

app = Flask(__name__)

#Check for environment variable
#if not os.getenv("DATABASE_URL"):
 #   raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
#engine = create_engine(os.getenv("DATABASE_URL"))
#db = scoped_session(sessionmaker(bind=engine))

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/login",methods=["GET", "POST"])
def login():
    return redirect("/")


@app.route("/register",methods=["GET", "POST"])
def register():
    return render_template("register.html")

@app.route("/quizzes")
def quizzes():
    return render_template("quizzes.html")
