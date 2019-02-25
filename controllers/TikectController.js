'use strict';
var bCrypt = require('bcrypt-nodejs');
var models = require('../models');
var Usuario = models.usuario;
var Cuenta = models.cuenta;
var Vehiculo = models.vehiculo;
var Tikect = models.tikect;
var Plaza = models.plaza;

const uuidv4 = require('uuid/v4');
class TikectController {

    Tikectvista(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Tikect.findAll({include: {model: Usuario, where: {idRol: 1}}}).then(function (tikect) {
                Plaza.findAll({}).then(function (plaza) {
                    res.render('usuario', {
                        titulo: 'Tikect',
                        layouts: 'partial/tikect/tikect',
                        usuario: usuario,
                        tikect: tikect,
                        plaza: plaza
                    });
                });
            });
        });

    }

    crearTikect(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Tikect.create({
                external_id: uuidv4(),
                horaInicio: req.body.hora_Inicio,
                horaFin: req.body.hora_Fin,
                fecha: req.body.fecha,
                estado: req.body.estado,
                precio: req.params.precio,
                idUsuario: usuario.idUsuario,
                id_plaza: req.body.plaza
            }).then(function (newTikect, created) {
                if (newTikect) {
                    req.flash('info', 'Se ha creado correctamente');
                    res.redirect('/usuario');
                }


            });
        });
    }

    TikectUsuario(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Tikect.findAll({where: {idUsuario: usuario.idUsuario, estado: true}}).then(function (tikect) {
                Vehiculo.findAll({where: {idUsuario: usuario.idUsuario, estado: true}}).then(function (vehiculo) {
                    res.render('usuario', {
                        titulo: "Tikect",
                        layouts: 'partial/tikect/tikectReserva',
                        tikect: tikect,
                        usuario: usuario,
                        carro: vehiculo

                    });
                });
            });
        });
    }

    verTikect(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Tikect.findAll({where: {idUsuario: usuario.idUsuario}}).then(function (tikect) {
                res.render('usuario', {
                    titulo: "Tikect",
                    layouts: 'partial/tikect/ver_tikect',
                    tikect: tikect,
                    usuario: usuario

                });
            });
        });
    }

    modificarTikect(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Tikect.update({
                horaInicio: req.body.horaInicio,
                horaFin: req.body.horaFin,
                fecha: req.body.fecha,
                estado: req.body.estado

            }, {where: {external_id: req.params.external}}).then(function (updatedTikect, created) {
                if (updatedTikect) {
                    req.flash('info', 'Se ha modificado  correctamente');
                    res.redirect('/usuario');
                }
            });
        });
    }
    EditarTikectVista(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Tikect.findOne({where: {external_id: req.params.external}}).then(function (tikect) {
                res.render('usuario', {
                    titulo: 'Tikect',
                    layouts: 'partial/tikect/editar_tikect',
                    usuario: usuario,
                    tikect: tikect
                });
            });
        });
    }
}
module.exports = TikectController;

