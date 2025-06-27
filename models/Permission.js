/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Permission = sequelize.define("Permission", {
    id:     {type: DataTypes.BIGINT,   primaryKey: true, autoIncrement: true},
    name:   { type: DataTypes.STRING, allowNull: true },
    description: DataTypes.STRING
  })
  return Permission
}