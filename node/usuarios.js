var express = require('express');
var bodyParser = require('body-parser');
var Usuario = require('../models/usuario.js')
var db = require('../db.js')

var router = express.Router();

exports.register = function(req, res) {
	var id = req.body.id;
	var nombre = req.body.nombre;
	var ap1 = req.body.ap1;
	var ap2 = req.body.ap2;
	var fechaNac = req.body.fechaNac;
	var genero = req.body.genero;
	var noCel = req.body.noCel;
	var noTel = req.body.noTel;
	var ext = req.body.ext;
	var email = req.body.email;
	var pass = req.body.pass;
	//res.send('POST request to the homepage\n'+req.body.nombre+'\n' + id + ',' + nombre + ','+ ap1 + ','+ ap2 + ','+ fechaNac + ','+ genero + ','+ noCel + ','+ noTel + ','+ ext + ','+ email + ','+ pass + ',');

	var data;
	if (ap2){
		data = {
			tables:{
				TB_CLIENTES: [
					{Nombre:nombre,Apellido_1:ap1,Apellido_2:ap2,Email:email,Password:pass},
				],
			},
		}
	}
	else{
		data = {
			tables:{
				TB_CLIENTES: [
					{Nombre:nombre,Apellido_1:ap1,Email:email,Password:pass},
				],
			},
		}
	}
	db.fixtures(data, function(err) {
		if (err)
			res.send(JSON.stringify({ error: "hubo un error"+err }));
		else
			res.send(JSON.stringify({ sucess: "todo estuvo bien" }));
	})
};
