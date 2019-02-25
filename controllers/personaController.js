'use strict';
var bCrypt = require('bcrypt-nodejs');
var models = require('../models');
var Usuario = models.usuario;
var Cuenta = models.cuenta;
var Tikect = models.tikect;
var Vehiculo = models.vehiculo;
var Plaza = models.plaza;
//para subir imagen
var fs = require('fs');
var maxFileSize = 1 * 10024 * 10024;
var extensiones = ["jpg", "png"];
var formidable = require('formidable');
//fin de subir archivos
class PersonaController {

    persona(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            res.render('usuario', {
                titulo: "Usuario",
                layouts: 'partial/usuario/editar_usuario',
                usuario: usuario
            });
        });
    }
    ListarPersona(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {

            res.render('usuario', {
                titulo: "Usuario",
                layouts: 'partial/usuario/inicio_usuario',
                nombre: req.user.nombre,
                rol: req.user.rol,
                usuario: usuario,
                info: req.flash('info'),
                error: req.flash('error')
            });
        });


    }

    modificarUsuario(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Usuario.update({
                apellido: req.body.apellidos,
                nombre: req.body.nombres,
                telefono: req.body.telefono,
                direccion: req.body.direccion
            }, {where: {external_id: req.user.id_persona}}).then(function (updatedUser, created) {
                if (updatedUser) {
                    var clave = bCrypt.hashSync(req.body.clave, bCrypt.genSaltSync(8), null);
                    Cuenta.update({
                        clave: clave
                    }, {where: {idUsuario: usuario.idUsuario}}).then(function (updatedCuenta, created) {
                        if (updatedCuenta) {
                            req.flash('info', 'Se ha modificado correctamente');
                            res.redirect('/usuario');
                        }
                    });
                }
            });
        });
    }

    infoUsuario(req, res) {
        Usuario.findOne({where: {external_id: req.user.id_persona}}).then(function (usuario) {
            Vehiculo.findAll({where: {idUsuario: usuario.idUsuario}}).then(function (vehiculo) {
                Tikect.findAll({where: {idUsuario: usuario.idUsuario}}).then(function (tikect) {
                    if (req.user.rol === 'usuario') {
                        res.render('usuario', {
                            titulo: "Usuario",
                            layouts: 'partial/usuario/perfil_usuario',
                            nombre: req.user.nombre,
                            rol: req.user.rol,
                            carro: vehiculo,
                            usuario: usuario,
                            tikect: tikect,
                            error_admin: req.flash('error_admin'),
                            info: req.flash('info'),
                            error: req.flash('error')
                        });
                    } else {
                        res.redirect('/admin');

                    }

                });
            });
        });
    }
    infoAdmin(req, res) {
        Usuario.findAll().then(function (usuario) {
            Plaza.findAll({}).then(function (plaza) {
                Vehiculo.findAll({include: {model: Usuario, where: {idRol: 1}}}).then(function (vehiculo) {
                     Tikect.findAll({include: {model: Usuario, where: {idRol: 1}}}).then(function (tikect) {
                    res.render('admin', {
                        layouts: 'hbs/admin/perfil_admin',
                        plaza: plaza,
                        usuario: usuario,
                             tikect: tikect,
                        vehiculo: vehiculo
                    });
                });
            });
              });
        });
    }

    guardarImagen(req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (files.archivo.size <= maxFileSize) {
                var extension = files.archivo.name.split(".").pop().toLowerCase();
                if (extensiones.includes(extension)) {
                    var nombre = fields.external_foto + "." + extension;
                    fs.rename(files.archivo.path, "public/images/fotos_usuarios/" + nombre, function (err) {
                        if (err)
                            next(err);
                        Usuario.update({
                            foto: nombre
                        }, {where: {external_id: fields.external_foto}}).then(function (updatedVino) {
                            if (updatedVino) {
                                req.flash('info', 'se ha modificado correctamente', false);
                                res.redirect('/usuario');
                            }
                        });
                    });
                } else {
                    PersonaController.eliminar(files.archivo.path);
                    req.flash('error', 'Error de extension', false);
                    res.redirect('/usuario');
                    console.log('error de extension');
                }
            } else {
                PersonaController.eliminar(files.archivo.path);
                req.flash('error', 'Error de tamanio se admite', false);
                res.redirect('/usuario');
                console.log('Error de tamanio se admite');
            }
        });
    }
    static eliminar(link) {
        fs.exists(link, function (exists) {
            if (exists) {
                console.log('Eliminando archivos existentes');
                fs.unlinkSync(link);
            } else {
                console.log('No se pudo borrar ' + link);
            }
        });
    }
}
module.exports = PersonaController;
