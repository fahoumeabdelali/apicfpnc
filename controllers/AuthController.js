require('dotenv').config();
/***********************************/
/*** Import des module nécessaires */
const jwt = require('jsonwebtoken')
const DB = require('../DbContext')
const { AuthenticationError } = require('../errors/customError')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')


const User = DB.User
const Role = DB.Role


exports.login = async (req, res, next) => {
    try {
        const { numcin, password, remember  } = req.body
        // Validation des données reçues
        if (!numcin || !password) {
            throw new AuthenticationError('Bad numcin or password', 400)
        }
        // Vérification si l'utilisateur existe
        let user = await User.findOne({ where: {numcin: numcin}, include: Role})
        if(user === null){
            throw new AuthenticationError('This account does not exist !', 404)
        }        
        // Vérification du mot de passe
        let test = await User.checkPassword(password, user.password)
        // let test = await User.findOne({ where: {password: password}})
        if(!test){
            throw new AuthenticationError('Password wrong', 401)
        }        
        // Génération du token et envoi
        const usrRoles = user.Roles.map(e => e.name) //parcourrir les roles d'un user et les mettre dans un array on utilsant le principe de la relation
        let token = ''
        if(remember){
            token = jwt.sign({
                numcin: user.numcin,
                roles:  usrRoles
        }, process.env.JWT_SECRET)
        }else{
            token = jwt.sign({
                numcin: user.numcin,
                roles:  usrRoles
            }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})
        }
        return res.json({
            token: token,
            numcin: user.numcin, 
            roles: usrRoles,
        })

    } catch (err) {
        next(err)
    }
}

exports.forgotPassword = async (req, res, next) => {
    try{
        const { email } = req.body
        if(!email){
            throw new AuthenticationError('Bad email', 400)
        }
        let user = await User.findOne({ where: {email: email}, include: Role})
        if(user === null){
            throw new AuthenticationError('This account does not exists !', 404)
        }
        const usrRoles = user.Roles.map(e => e.name)
        const token = jwt.sign({
            id:     user.id,
            name:   user.name,
            email:  user.email,
            roles:   usrRoles
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})
        return res.json({user: user, access_token: token})

    }catch(err){
        next(err)    
    }  
}

exports.register = async (req, res, next) => {
    try{
        const { name, email, password, confirmPassword } = req.body
        if (!name || !email || !password || !confirmPassword) {
            throw new AuthenticationError('Missing Data', 400)
        }        
        const user = await User.findOne({ where: { email: email }, raw: true })
        if (user !== null) { 
            throw new AuthenticationError('email already exists !', 409)
        }
        let role = await Role.findOne({ where: { name: req.body.role }})
        if (role == null) { 
            throw new AuthenticationError('This role does not exists !', 404)
        }
        let userc = await User.create(req.body)
        userc.addRole(role)
        return res.json({ message: 'User Created'})
        
    }catch(err){
        next(err)         
    }
}

exports.updatePassword = async (req, res, next) => {
    try{
        const { password } = req.body
        if (!password) {
            throw new AuthenticationError('Missing Data', 400)
        } 

        let hash = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        // User.password = hash
        // User.confirmPassword = hash
        const myBody = {
            password : hash,
            confirmPassword : hash
        }

        await User.update(myBody,{ where: { numcin: {[Op.ne]: null} } })
        return res.json({ message: 'User Updated' })

        
    }catch(err){
        next(err)         
    }




}

