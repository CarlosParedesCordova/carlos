'use strict';
var bCrypt = require('bcrypt-nodejs');
var models = require('../models');
var Estacionamiento = models.estacionamiento;
var Vehiculo = models.vehiculo;
var Tikect = models.tikect;
var Usuario = models.usuario;
var Plaza = models.plaza;
class ParqueaderoController {
    parqueadero(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Tikect.findOne({where: {idUsuario: usuario.idUsuario}}).then(function (tikect) {
                   Vehiculo.findAll({where: {idUsuario: usuario.idUsuario,estado:true}}).then(function (vehiculo) {
                         Plaza.findAll({ }).then(function (plaza) {
                    res.render('parqueadero', {
                        titulo: 'Parqueadero',
                        layouts: 'partial/parqueadero/estacionamiento',
                        tikect: tikect,
                        usuario: usuario,
                        vehiculo: vehiculo,
                        plaza: plaza
                    });
                });
                });
            });
        });
    }
}


module.exports = ParqueaderoController;
