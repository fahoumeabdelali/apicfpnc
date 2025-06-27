module.exports = (sequelize) => {
  const RolePermission = sequelize.define("RolePermission", {}, { timestamps: false })
  return RolePermission
}