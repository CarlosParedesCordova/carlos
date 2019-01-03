module.exports = function (sequelize, Sequelize) {
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
            defaultValue: Sequelize.UUIDV1
        }
    }, {freezeTableName: true, timestamps: false});

         Estacionamiento.associate = function (models){
        models.rol.hasOne(models.plaza, {
            foreignKey: 'id_estacionamineto'
        });
    };
    return Estacionamiento;
};
