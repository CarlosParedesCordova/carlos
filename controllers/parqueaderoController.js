'use strict';
var bCrypt = require('bcrypt-nodejs');
var models = require('../models');
var Parqueadero = models.estacionamiento;
var Usuario = models.usuario;
var Cuenta = models.cuenta;
var Vehiculo = models.vehiculo;
var Tikect = models.tikect;
const uuidv4 = require('uuid/v4');
class ParqueaderoController {

    parqueadero(req, res) {
        res.render('admin', {
            titulo: 'Parqueadero',
            layouts: 'hbs/parqueadero/registro_parqueadero'

        });
    }

    crearParqueadero(req, res) {
        Parqueadero.create({
            external_id: uuidv4(),
            nombre: req.body.nombre,
            numPlazas: req.body.numPlazas
        }).then(function (newParqueadero, created) {
            if (newParqueadero) {
                req.flash('info', 'Se ha creado correctamente');
                res.redirect('/admin');
            }
        });
    }

    verVehiculo(req, res) {
      Usuario.findAll({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Vehiculo.findAll({include: {model:Usuario, where:{ idRol:1}}}).then(function (vehiculo) {
                res.render('admin', {
                    titulo: 'Vehiculos',
                    layouts:'hbs/admin/perfil_admin',
                    usuario: usuario,
                    vehiculo: vehiculo
                });
            });
        });
    } 
    

    

}
module.exports = ParqueaderoController;
