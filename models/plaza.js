module.exports = function (sequelize, Sequelize) {
    var estacionamiento = require('../models/estacionamiento');
    var Estacionamiento = new estacionamiento(sequelize, Sequelize);
    var Plaza = sequelize.define('plaza', {
        id_plaza: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER.UNSIGNED
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        NumeroPlaza: {
            type: Sequelize.STRING(50)
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }
    }, {freezeTableName: true,
        timestamps: false});
    
  Plaza.associate = function (models) {
        models.plaza.hasMany(models.tikect, {
            foreignKey: 'id_plaza'
        });
    };


    return Plaza;
};