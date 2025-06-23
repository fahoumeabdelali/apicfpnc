/***********************************/
/*** Import des module nécessaires */
const DB = require('../DbContext')
const { CondidatError } = require('../errors/customError')

const Condidat = DB.Condidat
const User = DB.User
const Role = DB.Role

/***************************************/
/*** Routage de la ressource condidat */

exports.getAllCondidats = async (req, res, next) => {
    try {
        const condidats = await Condidat.findAll()
        return res.json({ data: condidats })

    } catch (err) {
        next(err)
    }
}

exports.getCondidat = async (req, res, next) => {
    let numcin = req.params.numcin

    // Vérification si le champ numcin est présent et cohérent
    if (!numcin) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération du condidat et vérification
        let condidat = await Condidat.findOne({ where: { numcin: numcin }})
        if (condidat === null) {
            return res.status(404).json({ message: 'This condidat does not exist !' })
        }
        return res.json({ data: condidat })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    } 
}

exports.addCondidat = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, lastName, firstName } = req.body  //n'extraire que les champs requies pour  Validation 
        // Validation des données reçues
        if (!name || !email || !password || !confirmPassword || !lastName || !lastName) {
            throw new CondidatError('Missing Data', 400)
        }
        const user = await User.findOne({ where: { email: email }, raw: true })
        if (user !== null) {
            throw new CondidatError('email already exists !', 409)
        }
        const condidat = await Condidat.findOne({ where: { lastName: lastName, firstName: firstName }, raw: true })
        if (condidat !== null) {
            throw new CondidatError(`The condidat ${condidat} already exists !`, 409)
        }
        const roles = await Role.findAll({ where: { name: [req.body.roles] }, raw: true })
        if (roles == null) {
            throw new CondidatError('This roles does not exists !', 404)
        }
        const userc = await User.create(req.body)
        for (let i = 0; i < roles.length; i++) {
            userc.addRole(roles[i].id)
        }

        // Céation de l'condidat
        const condidatc = await Condidat.create({
            condidatUserId: userc.id,
            lastName: req.body.lastName,
            firstName: req.body.firstName
        })
        return res.json({ message: 'Condidat Created', data: condidatc })

    } catch (err) {
        next(err)
    }
}
exports.updateCondidat = async (req, res, next) => {
    try {
        const numcin = parseInt(req.params.numcin)
        // Vérification si le champ id est présent et cohérent
        if (!numcin) {
            throw new CondidatError('Missing parameter', 400)
        }
        // Recherche de l'condidat et vérification
        const condidat = await Condidat.findOne({ where: { numcin: numcin }, raw: true })
        if (condidat === null) {
            throw new CondidatError('This condidat does not exist !', 404)
        }
        // Mise à jour de l'utilisateur
        await Condidat.update(req.body, { where: { numcin: numcin } })
        return res.json({ message: 'condidat Updated' })

    } catch (err) {
        next(err)
    }
}

exports.deleteCondidat = async (req, res, next) => {
    try {
        const numcin = parseInt(req.params.numcin)
        // Vérification si le champ id est présent et cohérent
        if (!numcin) {
            throw new CondidatError('Missing Parameter', 400)
        }
        // Suppression de l'utilisateur
        const condidat = await Condidat.findByPk(req.params.numcin, { raw: true })
        if (condidat === null) {
            throw new CondidatError('This condidat does not exist !', 404)
        }
        // La suppresion de user supprime userRole  et condidat en cascade
        await User.destroy({ where: { id: condidat.condidatUserId }, force: true })
        return res.json({ message: 'condidat Deleted' })

    } catch (err) {
        next(err)
    }
}