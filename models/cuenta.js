module.exports = function (sequelize, Sequelize) {
    var persona = require('../models/usuario');
    var Persona = new persona(sequelize, Sequelize);
    var Cuenta = sequelize.define('cuenta', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        correo: {
            type: Sequelize.STRING(50)
        },
        clave: {
            type: Sequelize.STRING
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        token:{
            type: Sequelize.TEXT
        }

    }, {freezeTableName: true
    });

    Cuenta.belongsTo(Persona, {
        foreignKey: 'idUsuario',
        constraints: false
    });

    return Cuenta;
};