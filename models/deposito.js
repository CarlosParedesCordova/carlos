module.exports = function (sequelize, Sequelize) {
    var cartera = require('./cartera');
    var Cartera = new cartera(sequelize, Sequelize);
    var Deposito = sequelize.define('deposito', {
        id_deposito: {
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
        monto: {
            type: Sequelize.DECIMAL(10, 2)
        },
        fecha: {
            type: Sequelize.DATE
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        }

    }, {
        timestamps: false,
        freezeTableName: true
    });

    Deposito.belongsTo(Cartera, {
        foreignKey: 'id_cartera'
   

    });
    return Deposito;
};

