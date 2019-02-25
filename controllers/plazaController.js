'use strict';
var bCrypt = require('bcrypt-nodejs');
var models = require('../models');
var Parqueadero = models.estacionamiento;
var Plaza = models.plaza;
var Usuario = models.usuario;
var Cuenta = models.cuenta;
var Vehiculo = models.vehiculo;
var Tikect = models.tikect;
const uuidv4 = require('uuid/v4');
class PlazaController {

    plaza(req, res) {
        res.render('admin', {
            titulo: 'Plaza',
            layouts: 'hbs/plaza/registro_plaza'

        });
    }

    crearPlaza(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Plaza.create({
                external_id: uuidv4(),
                estado: req.body.estado,
                NumeroPlaza: req.body.NumeroPlaza

            }).then(function (newPlaza, created) {
                if (newPlaza) {
                    req.flash('info', 'Se ha creado correctamente');
                    res.redirect('/admin');
                }
            });
        });
    }
    editarPLaza(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Vehiculo.findOne({where: {external_id: req.params.external}}).then(function (vehiculo) {
                Plaza.findOne({where: {external_id: req.params.external}}).then(function (plaza) {
                    res.render('usuario', {
                        titulo: 'Vehiculos',
                        layouts: 'hbs/plaza/editar_plaza',
                        usuario: usuario,
                        vehiculo: vehiculo,
                        plaza: plaza

                    });
                });
            });
        });
    }
    modificarPlaza(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Plaza.update({
                estado: req.body.estado,
                NumeroPlaza: req.body.NumeroPlaza
            }, {where: {external_id: req.params.external}}).then(function (updatedPlaza, created) {
                if (updatedPlaza) {
                    req.flash('info', 'Se ha modificado  correctamente');
                    res.redirect('/usuario');
                }
            });
        });
    }
}
module.exports = PlazaController;
