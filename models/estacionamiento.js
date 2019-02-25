module.exports = function (sequelize, Sequelize) {
    var aux = require('../models/usuario');
    var Usuario = new aux(sequelize, Sequelize);
    var Estacionamiento = sequelize.define('estacionamiento', {
        id_estacionamiento: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING(50)
        },
        numPlazas: {
            type: Sequelize.STRING(30)
        },

        external_id: {
     type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }
    }, {freezeTableName: true, timestamps: false});

   
     Estacionamiento.belongsTo(Usuario, {foreignKey: 'idUsuario', constraints: false});
    return Estacionamiento;
};