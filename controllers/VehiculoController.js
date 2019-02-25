'use strict';
var bCrypt = require('bcrypt-nodejs');
var models = require('../models');
var Usuario = models.usuario;
var Cuenta = models.cuenta;
var Vehiculo = models.vehiculo;
const uuidv4 = require('uuid/v4');
class VehiculoController {

    vehiculo(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            res.render('usuario', {
                titulo: 'Vehiculos',
                layouts: 'partial/vehiculos/vehiculo',
                usuario: usuario

            });
        });
    }
    guardar(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Vehiculo.create({
                external_id: uuidv4(),
                placa: req.body.placa,
                color: req.body.color,
                marca: req.body.marca,
                estado: req.body.estado,
                idUsuario: usuario.idUsuario
                

            }).then(function (newVehiculo, created) {
                if (newVehiculo) {
                    req.flash('info', 'Se ha creado correctamente');
                    res.redirect('/usuario');
                }
            });
        });
    }

    editarVehiculo(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Vehiculo.findOne({where: {external_id: req.params.external}}).then(function (vehiculo) {
                res.render('usuario', {
                    titulo: 'Vehiculos',
                    layouts: 'partial/vehiculos/editar_vehiculo',
                    usuario: usuario,
                    vehiculo: vehiculo


                });
            });
        });
    }
    modificarVehiculo(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Vehiculo.update({
                placa: req.body.placa,
                marca: req.body.marca,
                color: req.body.color,
                estado: req.body.estado

            }, {where: {external_id: req.params.external}}).then(function (updatedVehiculo, created) {
                if (updatedVehiculo) {
                    req.flash('info', 'Se ha modificado  correctamente');
                    res.redirect('/usuario');
                }
            });
        });
    }

}
module.exports = VehiculoController;