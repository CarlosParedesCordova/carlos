module.exports = function (sequelize, Sequelize) {
    var usuario = require('./usuario');
    var Usuario = new usuario(sequelize, Sequelize);
    var Rol = sequelize.define('rol', {
        idRol: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        nombre: {
            type: Sequelize.STRING(20)}
     }, {
        timestamps: false,
        freezeTableName: true
    });

 Rol.belongsTo(Usuario, {
        foreignKey: 'idUsuario'
      

    });

    return Rol;
};