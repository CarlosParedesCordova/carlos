module.exports = function (sequelize, Sequelize) {
    var estacionamiento = require('./estacionamiento');
    var Estacionamiento = new estacionamiento(sequelize, Sequelize);
    var Plaza = sequelize.define('plaza', {
        id_plaza: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },

        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        }
    }, {freezeTableName: true, timestamps: false});


    Plaza.associate = function (models) {
        models.rol.hasOne(models.plaza, {
            foreignKey: 'id_plaza'
        });
    };

    Plaza.belongsTo(Estacionamiento, {
        foreignKey: 'id_estacionamiento'

    });
    return Plaza;
};
