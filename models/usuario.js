module.exports = function (sequelize, Sequelize) {
    var rol = require('../models/rol');
    var Rol = new rol(sequelize, Sequelize);
    var Usuario = sequelize.define('usuario', {
        idUsuario: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING(50)
        },
        apellido: {
            type: Sequelize.STRING(50)
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        direccion: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING(15)
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }, 
       foto: {
            type: Sequelize.STRING(100)
        }
    }, {freezeTableName: true,
    timestamps: false
    });

  
      Usuario.associate = function (models) {
        
        models.usuario.hasOne(models.cuenta, {
            foreignKey: 'idUsuario'
        });
        models.usuario.hasOne(models.estacionamiento, {
            foreignKey: 'idUsuario'
        });
        models.usuario.hasMany(models.tikect, {
            foreignKey: 'idUsuario'
        });
        models.usuario.hasMany(models.vehiculo, {
            foreignKey: 'idUsuario'
        });
    };
      Usuario.belongsTo(Rol, {
        foreignKey: 'idRol', constraints: false
    });

    return Usuario;
};
