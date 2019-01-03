module.exports = function (sequelize, Sequelize) {
    var usuario = require('./usuario');
    var Usuario = new usuario(sequelize, Sequelize);
    var Cartera = sequelize.define('cartera', {
        id_cartera: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING(30)
        },
        saldo: {
            type: Sequelize.DECIMAL(10, 2)
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    Cartera.belongsTo(Usuario, {
        foreignKey: 'idUsuario'
    

    });
    
     Usuario.associate = function (models) {
        models.cartera.hasMany(models.deposito, {
            foreignKey: 'id_cartera'
        });
    };
    return Cartera;
};

