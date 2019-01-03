module.exports = function (sequelize, Sequelize) {
    var plaza = require('./plaza');
    var Plaza = new plaza(sequelize, Sequelize);
    var usuario = require('./usuario');
    var Usuario = new usuario(sequelize, Sequelize);
    var Tikect = sequelize.define('tikect', {
        id_tikect: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        horaInicio: {

            type: Sequelize.TIME
        },
        horaFin: {

            type: Sequelize.TIME
        },

        fecha: {
            type: Sequelize.DATE
        },

        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        }
    }, {freezeTableName: true,
        createdAt: "fecha_registro",
        updateAt: 'fecha_modificacion'
    });

  Tikect.associate = function (models) {
        models.tikect.hasMany(models.pago, {
            foreignKey: 'id_tikect'
        });
    };
    

    Tikect.belongsTo(Usuario, {
        foreignKey: 'idUsuario'
    });
        
   Tikect.belongsTo(Plaza, {
        foreignKey: 'idUsuario'

    });
    
    
    return Tikect;
};
