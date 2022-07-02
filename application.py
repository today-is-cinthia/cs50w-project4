import email
from email import message
import os
from unicodedata import name

from flask import Flask, session, flash, redirect, render_template, request, session, url_for, jsonify
from flask_socketio import SocketIO, emit, send
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from dotenv import load_dotenv
from werkzeug.security import check_password_hash, generate_password_hash
from loginrequired import login_required
import json

app = Flask(__name__)

#Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/logout")
def logout():
    session.clear()
    flash('You succesfully logged out')
    return redirect("/")


@app.route("/login",methods=["GET", "POST"])
def login():
    session.clear()

    if request.method == "POST":
        rows = db.execute(
            "SELECT * FROM users WHERE usuario = :usuario",
                          {"usuario": request.form.get("username")}).fetchall()

        if len(rows) != 1 or not check_password_hash(rows[0]["contraseña"], request.form.get("password")):
            flash('invalid username and/or password')
            return render_template("login.html")

        session["user_id"] = rows[0]["id"]

        return redirect("/home")
    else:
        return render_template("login.html")
    return render_template("login.html")


@app.route("/register",methods=["GET", "POST"])
def register():
    if request.method == "POST":
        user = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        if confirmation != password:
            flash("Las contraseñas no coinciden")
            return render_template("register.html")

        rows = db.execute(
            "SELECT usuario FROM users WHERE usuario=:username", {"username": user}).fetchall()

        if not rows:
            db.execute("INSERT INTO users (usuario, contraseña) VALUES (:username, :password)",
                       {"username": user, "password": generate_password_hash(password)})
            db.commit()
        elif rows:
            flash("El usuario ya está registrado")
            return render_template("register.html")

        return redirect("/home")

    else:
        return render_template("register.html")

@app.route("/quizzes")
@login_required
def quizzes():
    query = db.execute("SELECT * FROM test")
    return render_template("quizzes.html", query=query)

@app.route("/search/<categoria>")
def search(categoria):
    busqueda = db.execute("SELECT * FROM test WHERE categoria=:categoria", {"categoria": categoria}).fetchall()
    return render_template("categorias.html", busqueda=busqueda)


@app.route("/contactus", methods=["GET", "POST"])
@login_required
def contactus():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")

        db.execute("IN")
    return render_template("contactus.html")
    
@app.route("/aboutus")
@login_required
def aboutus():
    return render_template("aboutus.html")

@app.route("/reviews/<id>", methods=["GET", "POST"])
@login_required
def reviews(id):
    test = db.execute("SELECT * FROM test WHERE id=:id", {"id":id})
    idcomentario= db.execute("SELECT id FROM reviews WHERE id_test =:id_test AND id_user=:id_user", {"id_test": id, "id_user":session["user_id"]}).fetchone()
    if idcomentario is not None:
        idcomentario = idcomentario[0]

    print(idcomentario)

    if request.method == "POST":
        rating = int(request.form.get("rating"))
        comentario = request.form.get("comentario")
        db.execute("INSERT INTO reviews (comentario, rating, id_test, id_user) VALUES (:comentario, :rating, :id_test, :id)",
            { "comentario": comentario, "rating": rating, "id_test": id, "id": session["user_id"]})
        db.commit()
        return redirect('/reviews/'+id)
    else:
        query = db.execute("SELECT users.usuario, comentario, rating FROM users \
         INNER JOIN reviews ON users.id = reviews.id_user WHERE id_test = :id_test", {"id_test": id})
        reseñas = query.fetchall()

        idcomen = db.execute("SELECT id FROM reviews WHERE id_test=:id_test",{"id_test":id}).fetchone()
        if idcomen is not None:
            idcomen = idcomen[0]
        
        esmio = db.execute("SELECT id_user FROM reviews WHERE id=:id",{"id": idcomen}).fetchone()
        if esmio is not None:
            esmio = esmio[0]


        cur_user = session["user_id"]


    return render_template("reviews.html", test=test, reseñas=reseñas, idcomentario=idcomentario, id=id,esmio=esmio, cur_user=cur_user)

@app.route("/play/<id>")
def play(id):
    pregunta = db.execute("SELECT * FROM cuestionario WHERE id_test=:id_test", {"id_test":id}).fetchall()
    id_pregunta = db.execute("SELECT id FROM cuestionario WHERE id_test=:id_test",{"id_test": id}).fetchone()
    if id_pregunta is not None:
        id_pregunta = id_pregunta[0]
    print(id_pregunta)
    respuesta = db.execute("SELECT * FROM respuestas WHERE id_pregunta=:id_pregunta",{"id_pregunta":id_pregunta})

    preguntas = list()
    for i in pregunta:
        preguntas.append(i)
    print(preguntas)

    test = db.execute("SELECT * FROM test WHERE id=:id", {"id":id})
    return render_template("play.html", pregunta=preguntas, respuesta=respuesta, nom=test, id=id)

@app.route("/remove/<id><id_test>")
def remove(id, id_test):
    db.execute("DELETE FROM reviews WHERE id=:id", {"id":id})
    db.commit()
    return redirect('/reviews/' + id_test)

@app.route("/edit/<id><id_test>",  methods=["GET", "POST"])
def edit(id, id_test):
    if request.method == "POST":
        edit = request.form.get("editcoment")
        rating = int(request.form.get("rating"))
        db.execute("UPDATE reviews SET comentario =:edit, rating=:rating WHERE id=:id AND id_test=:id_test",{"edit": edit, "rating":rating,"id":id, "id_test":id_test})
        db.commit()
    return redirect('/reviews/' + id_test)