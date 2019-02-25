var express = require('express');
var router = express.Router();
var passport = require('passport');
var cuenta = require("../controllers/CuentaController.js");
var cuentaController = new cuenta();
//usuairo
var persona = require("../controllers/personaController.js");
var personaController = new persona();
//Estacionamineto
var estacionamiento = require("../controllers/estacionamientoController.js");
var estacionamientoController = new estacionamiento();
//vehiculo
var vehiculo = require("../controllers/VehiculoController.js");
var VehiculoController = new vehiculo();
//tikect
var tikect = require("../controllers/TikectController.js");
var TikectController = new tikect();
//parqueadero
var parqueadero = require("../controllers/parqueaderoController.js");
var ParqueaderoController = new parqueadero();

var plaza = require("../controllers/plazaController.js");
var PlazaController = new plaza();


var auth = function middleWare(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("err_cred", "Inicia sesion !!!");
        res.redirect('/login');
    }
};
var admin = function middleWare(req, res, next) {
    if (req.user.rol === 'administrador') {
        next();
    } else {
        req.flash('error_admin', 'Sin Acceso');
        res.redirect('/admin');
    }
};
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', layouts: 'partial/principal'});
});

router.get('/login', cuentaController.sesion);
router.get('/registro', cuentaController.registro );
router.get('/cerrar', cuentaController.cerrar);
//usuario
router.get('/usuario', auth, personaController.infoUsuario);
router.get('/editar', auth, personaController.persona);
router.post('/guardar_foto', auth, personaController.guardarImagen);
router.post('/editar_usuario', auth, personaController.modificarUsuario);

//estacionamiento
router.get('/estacionamiento', estacionamientoController.parqueadero);

//vehiculo
router.get('/registroVehiculo', auth, VehiculoController.vehiculo);
router.post('/registro/guardar/vehiculo', auth, VehiculoController.guardar);
router.post('/editar/vehiculo/:external', auth, VehiculoController.modificarVehiculo);
router.get('/vista_editar/:external', auth, VehiculoController.editarVehiculo);

//Tikect
router.get('/tikect', auth, TikectController.Tikectvista);
router.post('/crear/tikect/:precio', auth, TikectController.crearTikect);
router.get('/verTikect', auth, TikectController.verTikect);
router.post('/editar/tikect/:external', auth, TikectController.modificarTikect);
router.get('/editar_vista_tikect/:external', auth, TikectController.EditarTikectVista);
router.get('/verTikectUsuario', auth, TikectController.TikectUsuario);

//admin
router.get('/admin', auth, admin, personaController.infoAdmin);
//Parqueadero
router.get('/parqueadero', auth, admin, ParqueaderoController.parqueadero);
router.post('/registro/parqueadero', auth, admin ,ParqueaderoController.crearParqueadero);

//Plazas
router.get('/plaza', auth, admin, PlazaController.plaza);
router.post('/registro/plaza', auth, admin ,PlazaController.crearPlaza);
router.get('/editar_vista_plaza/:external', auth, admin, PlazaController.editarPLaza);
router.post('/editar/plaza/:external', auth, PlazaController.modificarPlaza);
//ver usuarios admin
router.get('/vehiculos', auth, admin, ParqueaderoController.verVehiculo);

router.get('/guardar_token/:token', cuentaController.guardarToken);


//reserva


//registro  de Usuarios
router.get('/registro', cuentaController.signup);
router.post('/registro/guardar', passport.authenticate('local-signup',
        {session: false, successRedirect: '/login', failureRedirect: '/registro'}));
//inicio

router.post('/iniciar_sesion', passport.authenticate('local-signin',
        {successRedirect: '/usuario', failureRedirect: '/login'}));

module.exports = router;
