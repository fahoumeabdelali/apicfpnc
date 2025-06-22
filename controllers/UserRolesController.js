/***********************************/
/*** Import des module nécessaires */
const DB = require('../DbContext')
const UserRoles = DB.UserRoles
const User = DB.User
const Role = DB.Role

/**************************************************/
/*** Routage de la ressource UserRoles */

exports.getAllUserRoles = (req, res) => {

    UserRoles.findAll({include: [User, Role]})
        .then(userRoles => res.json({ data: userRoles }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getUserRoles = async (req, res) => {
    let userRolesId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userRolesId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de UserRoles et vérification
        let userRoles = await UserRoles.findOne({ where: { id: userRolesId }, include: [User, Role]})
        if (userRoles === null) {
            return res.status(404).json({ message: 'This userRoles does not exist !' })
        }

        return res.json({ data: userRoles })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.addUserRoles = async (req, res) => {
    const { userId, roleId} = req.body  //n'extraire que les champs requies pour  Validation 

    // Validation des données reçues
    if (!userId || !roleId) {
        return res.status(400).json({ message: 'Missing Data' })
    }
    try{
        // Vérification si UserRoles existe déjà
        const userRoles = await UserRoles.findOne({ where: { userId: userId, roleId: roleId }, raw: true })
        if (userRoles !== null) {
            return res.status(409).json({ message: `The userRoles ${userRoles} already exists !` })
        }

        // Céation de UserRoles
        let userRolesc = await UserRoles.create(req.body)
        return res.json({ message: 'UserRoles Created', data: userRolesc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updateUserRoles = async (req, res) => {
    let userRolesId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userRolesId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de UserRoles et vérification
        let userRoles = await UserRoles.findOne({ where: {id: userRolesId}, raw: true})
        if(userRoles === null){
            return res.status(404).json({ message: 'This UserRoles does not exist !'})
        }

        // Mise à jour de UserRoles
        await UserRoles.update(req.body, { where: {id: userRolesId}})
        return res.json({ message: 'UserRoles Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.deleteUserRoles =  (req, res) => {
    let userRolesId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!userRolesId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de UserRoles
    UserRoles.destroy({ where: {id: userRolesId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}