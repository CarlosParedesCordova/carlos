module.exports = function (sequelize, Sequelize) {
    var usuario = require('./usuario');
    var Usuario = new usuario(sequelize, Sequelize);
    var Cuenta = sequelize.define('cuenta', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        correo: {
            type: Sequelize.STRING(30)

        },
        clave: {
            type: Sequelize.STRING(30)
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, {freezeTableName: true,
        createdAt: "fecha_registro",
        updateAt: 'fecha_modificacion'
    });
    Cuenta.belongsTo(Usuario, {
        foreignKey: 'idUsuario'
      

    });

    return Cuenta;
};


