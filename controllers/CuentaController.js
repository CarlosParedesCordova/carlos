'use strict';
var models = require('../models');
var Cuenta = models.cuenta;
class CuentaController {
    signup(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/registro');
        } else {
            req.flash;
            
            res.render('registro', {error: req.flash('correo_repetido')});

        }
    }
    sesion(req, res) {
        res.render('login', {
            titulo: 'Iniciar Sesion',
            layouts: 'partial/inicio_sesion',
            error: req.flash('err_cred'),
            sesion :req.flash('sesion')

        });
    }
    registro(req, res) {

        res.render('login', {
            titulo: 'Registro',
            layouts: 'partial/registro',
            error: req.flash('correo_repetido')
        });
    }
    cerrar(req, res) {
        req.session.destroy();
        res.redirect("/");
    }

    guardarToken(req, res) {
        var token = req.params.token;
        console.log(token + "*****************************");
        Cuenta.update({
            token: token
        }, {where: {external_id: req.user.id_cuenta}}).then(function (updatedToken, created) {
            if (updatedToken) {
                req.session.mensaje = [];
                var data = {mensaje: 'se ha guardado token'};
                req.session.mensaje.push(data);
                res.status(200).json(req.session.mensaje);
            }
        });
    }

}
module.exports = CuentaController;
