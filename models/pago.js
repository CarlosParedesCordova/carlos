
module.exports = function (sequelize, Sequelize) {
     var tikect = require('./tikect');
    var Tikect = new tikect(sequelize, Sequelize);
    var Pago = sequelize.define('pago', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER(6).ZEROFILL

        },
        montoPago: {
            type: Sequelize.ENUM('Administrador', 'Usuario')
        },
        tipoPago: {
            type: Sequelize.ENUM('Deposito', 'Tarjeta')
        },
      
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        }
    }, {freezeTableName: true,
        timestamps: true,
        createdAt: 'fechaPago',
        updatedAt: false,
        deletedAt: false
    });
   
      Pago.belongsTo(Tikect, {
        foreignKey: 'id_tikect'
    });
        
    return Pago;
};


