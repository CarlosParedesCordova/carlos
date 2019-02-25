module.exports = function (sequelize, Sequelize) {
    var Rol = sequelize.define('rol', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING(20)
        }
    }, {timestamps: false, 
        freezeTableName: true});
    
    Rol.associate = function (models) {
        models.rol.hasMany(models.usuario, {
            foreignKey: 'idRol'});
    };
    
    return Rol;
};