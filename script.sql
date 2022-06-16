CREATE DATABASE cquizz;


CREATE TABLE users(id INTEGER PRIMARY KEY AUTO_INCREMENT, usuario character varying(15) NOT NULL, contraseña character varying(100) NOT NULL);

CREATE TABLE test(id INTEGER PRIMARY KEY AUTO_INCREMENT, nombre character varying(30) NOT NULL, categoria character varying(20) NOT NULL, preguntas character varying(100) NOT NULL, id_pregunta INTEGER AUTO_INCREMENT NOT NULL);

CREATE TABLE reviews(comentario character varying(100) NOT NULL, rating INTEGER NOT NULL, id_user INTEGER INTEGER REFERENCES users(id_user), id_test INTEGER REFERENCES test(id));

CREATE TABLE respuestas(id INTEGER PRIMARY KEY AUTO_INCREMENT, respuesta character varying(100) NOT NULL, id_respuesta INTEGER REFERENCES test(id_pregunta) );
