module.exports = function (sequelize, Sequelize) {
    var usuario = require('./usuario');
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
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        }

    }, {freezeTableName: true,
        createdAt: "fecha_registro",
        updateAt: 'fecha_modificacion'
    });

    Vehiculo.belongsTo(Usuario, {
        foreignKey: 'idUsuario'
      

    });

    return Vehiculo;
};

