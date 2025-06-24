/************************************/
/*** Import des modules nécessaires */
const { Sequelize } = require('sequelize')

const databasehost = process.env.DB_HOST
const databaseport = process.env.DB_PORT
const databasename = process.env.DB_NAME
const dbuser = process.env.DB_USER
const dbpassword = process.env.DB_PASS



/************************************/
/*** Connexion à la base de données */
let sequelize = new Sequelize( databasename, dbuser, dbpassword, { 
    host: databasehost, 
    port: databaseport,
    dialect: 'mysql',
    // desactivation de l'affichage dans la console des requettes sql générées par sequelize quand il s'agit de l'environement de production .
    logging:  console.log
    // logging: process.env.NODE_ENV === 'production' ? false : console.log
    }
)


/*** Mise en place des relations */
const db = {}
db.sequelize = sequelize

db.User =                   require('./models/User')(sequelize)
db.Condidat =               require('./models/Condidat')(sequelize)
db.Role =                   require('./models/Role')(sequelize)
db.UserRoles =              require('./models/UserRoles')(sequelize)



db.User.belongsToMany(db.Role, {through: db.UserRoles })
db.Role.belongsToMany(db.User, {through: db.UserRoles })
db.User.hasMany(db.UserRoles)
db.UserRoles.belongsTo(db.User)
db.Role.hasMany(db.UserRoles)
db.UserRoles.belongsTo(db.Role)


db.User.hasOne(db.Condidat, {foreignKey: 'numcin'})
db.Condidat.belongsTo(db.User, {foreignKey: 'numcin'})



/*********************************/
/*** Synchronisation des modèles */
// sequelize.sync(err => {
//     console.log('Database Sync Error', err)
// })

// db.sequelize.sync({ logging: console.log })
// db.sequelize.sync({force: true}) // Cela crée la table, en la supprimant d'abord si elle existait déjà.
// db.sequelize.sync({alter: true}) // effectue les modifications nécessaires dans la table pour la faire correspondre au modèle.
db.sequelize.sync() // Cela crée la table si elle n'existe pas (et ne fait rien si elle existe déjà).

module.exports = db