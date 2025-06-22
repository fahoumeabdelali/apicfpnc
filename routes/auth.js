/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const authCtrl = require('../controllers/AuthController')

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/***********************************************************/
/*** Middleware appliqué seulement pour les routes auth. */
/************* Remarqué ici router.use(middelware) *******/
router.use( (req, res, next) => {
    const event = new Date()
    console.log('AUTH Time:', event.toString())
    next()
})

/**********************************/
/*** Routage de la ressource Auth */

router.post('/login',           authCtrl.login)
router.post('/forgotPassword',  authCtrl.forgotPassword)
router.put('/register',         authCtrl.register)
router.put('/updatePassword',  authCtrl.updatePassword)

module.exports = router