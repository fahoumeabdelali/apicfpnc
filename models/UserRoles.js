module.exports = (sequelize) => {
    const UserRoles = sequelize.define('UserRoles', {}, { timestamps: false })
    return UserRoles
}