module.exports = function (sequelize, Sequelize) {
    var usuario = require('../models/usuario');
    var Usuario = new usuario(sequelize, Sequelize);
    var Vehiculo = sequelize.define('vehiculo', {
        placa: {
            primaryKey: true,
            type: Sequelize.STRING
        },
        marca: {
            type: Sequelize.STRING(50)
        },
        color: {
            type: Sequelize.STRING(50)
        },
        external_id: {
            type: Sequelize.UUID
        }, estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, {   paranoid: true,
        freezeTableName: true,
        tableName: 'vehiculo'
    });
    

    Vehiculo.belongsTo(Usuario, {foreignKey: 'idUsuario',constraints: false

    });

    return Vehiculo;
};
