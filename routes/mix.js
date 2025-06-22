/***********************************/
/*** Import des module nécessaires */
const express = require('express')

const userCtrl =                require('../controllers/UserController')


/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/**********************************************************************************************************/
/*** Middleware appliqué seulement pour les routes mixtes ["admin", "employee", "customer", "supplier"]. */
/************* Remarqué ici router.use(middelware) ******************************************************/
router.use( (req, res, next) => {
    const event = new Date()
    console.log('Admin Time:', event.toString())
    next()
})

// http://127.0.0.1:8888/mix
/**********************************/
/*** Routage de la ressource User */

router.patch('/password/users/:id', userCtrl.updatePassword)

module.exports = router