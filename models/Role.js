/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Role = sequelize.define('Role', {
        id:     {type: DataTypes.BIGINT,   primaryKey: true, autoIncrement: true},
        name:   {type: DataTypes.STRING(50),    allowNull: true},
    })
    return Role
}