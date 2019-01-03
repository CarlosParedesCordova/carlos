module.exports = function (sequelize, Sequelize) {
   
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
        correo: {
            type: Sequelize.STRING(50),
            unique: true
        },
        direccion: {
            type: Sequelize.STRING(50),
            unique: true
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        },

        telefono: {
            type: Sequelize.STRING(50)
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, {freezeTableName: true,
        createdAt: "fecha_registro",
        updateAt: 'fecha_modificacion'
    });

    Usuario.associate = function (models) {
        models.usuario.hasMany(models.vehiculo, {
            foreignKey: 'idUsuario'
        });
    };
    Usuario.associate = function (models) {
        models.usuario.hasMany(models.cuenta, {
            foreignKey: 'idUsuario'
        });
    };
    
     Usuario.associate = function (models) {
        models.usuario.hasMany(models.tikect, {
            foreignKey: 'idUsuario'
        });
    };
    
      Usuario.associate = function (models) {
        models.usuario.hasMany(models.cartera, {
            foreignKey: 'idUsuario'
        });
    };
    
         Usuario.associate = function (models) {
        models.usuario.hasMany(models.rol, {
            foreignKey: 'idUsuario'
        });
    };
    return Usuario;
};




