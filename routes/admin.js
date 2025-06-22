/***********************************/
/*** Import des module nécessaires */
const express = require('express')

const userCtrl =                require('../controllers/UserController')
const condidatCtrl =            require('../controllers/CondidatController')


/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/***********************************************************/
/*** Middleware appliqué seulement pour les routes admin. */
/************* Remarqué ici router.use(middelware) *******/
router.use( (req, res, next) => {
    const event = new Date()
    console.log('Admin Time:', event.toString())
    next()
})

// http://127.0.0.1:8888/admin
/**********************************/
/*** Routage de la ressource User */
/** On peut aussi appliquer un middelware sur use seule route (exple) router.get('/users',(req, res, next) => {...}; next(),userCtrl.getAllUsers) */
/** Le parametre req est un objet express js qui contient beaucoup d'informations comme l'IP du client etc ...*/

router.get('/users',                userCtrl.getAllUsers)
router.get('/users/:id',            userCtrl.getUser)
router.put('/users',                userCtrl.addUser)
router.patch('/users/:id',          userCtrl.updateUser)
router.post('/users/untrash/:id',   userCtrl.untrashUser)
router.delete('/users/trash/:id',   userCtrl.trashUser)
router.delete('/users/:id',         userCtrl.deleteUser)


/***************************************/
/*** Routage de la ressource Employee */

router.get('/condidats',                    condidatCtrl.getAllCondidats)
router.get('/condidats/:id',                condidatCtrl.getCondidat)
router.put('/condidats',                    condidatCtrl.addCondidat)
router.patch('/condidats/:id',              condidatCtrl.updateCondidat)
router.delete('/condidats/:id',             condidatCtrl.deleteCondidat)

module.exports = router