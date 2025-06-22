/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const UserRoles = sequelize.define('UserRoles', {}, { timestamps: false })
    return UserRoles
}