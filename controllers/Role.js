/***********************************/
/*** Import des module nécessaires */
const DB = require('../DbContext')
const Role = DB.Role

/**********************************/
/*** Routage de la ressource Role */

exports.getAllRoles = (req, res) => {
    Role.findAll()
        .then(roles => res.json({ data: roles }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getRole = async (req, res) => {
    let roleId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!roleId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération du role et vérification
        let role = await Role.findOne({ where: { id: roleId }})
        if (role === null) {
            return res.status(404).json({ message: 'This Role does not exist !' })
        }
        return res.json({ data: role })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}


exports.addRole = async (req, res) => {
    const { name } = req.body  //n'extraire que les champs requies pour  Validation 

    // Validation des données reçues
    if (!name) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le role  existe déjà
        const role = await Role.findOne({ where: { name: name }, raw: true })
        if (role !== null) {
            return res.status(409).json({ message: `The Role ${name} already exists !` })
        }

        // Hashage du mot de passe utilisateur
        //let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        //req.body.password = hash

        // Céation de l'utilisateur
        let rolec = await Role.create(req.body)
        return res.json({ message: 'Role Created', data: rolec })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.updateRole = async (req, res) => {
    let roleId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!roleId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let role = await Role.findOne({ where: {id: roleId}, raw: true})
        if(role === null){
            return res.status(404).json({ message: 'This Role does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Role.update(req.body, { where: {id: roleId}})
        return res.json({ message: 'Role Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}


exports.updatePassword = async (req, res) => {
    let roleId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!roleId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let role = await Role.findOne({ where: {id: roleId}, raw: true})
        if(role === null){
            return res.status(404).json({ message: 'This Role does not exist !'})
        }
        await Role.update(req.body, { where: {id: roleId}})
        return res.json({ message: 'Role Updated'})

    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}


exports.deleteRole =  (req, res) => {
    let roleId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!roleId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Role.destroy({ where: {id: roleId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}