module.exports = function (sequelize, Sequelize) {
    var usuario = require('../models/usuario');
    var Usuario = new usuario(sequelize, Sequelize);
    var plaza = require('../models/plaza');
    var Plaza = new plaza(sequelize, Sequelize);
    var Tikect = sequelize.define('tikect', {
        id_tikect: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        horaInicio: {

            type: Sequelize.TIME
        },
        horaFin: {

            type: Sequelize.TIME
        },
        fecha: {
            type: Sequelize.DATEONLY
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }, precio: {
            type: Sequelize.DOUBLE(7, 2)
        }
    }, {timestamps: false,
        freezeTableName: true
    });


    Tikect.belongsTo(Usuario, {foreignKey: 'idUsuario', constraints: false});
    Tikect.belongsTo(Plaza, {foreignKey: 'id_plaza', constraints: false});
    return Tikect;
};