/***********************************/
/*** Import des module nécessaires */
const express = require('express')

const condidatCtrl =               require('../controllers/CondidatController')


/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/***********************************************************/
/*** Middleware appliqué seulement pour les routes condidat. */
/************* Remarqué ici router.use(middelware) *******/
router.use( (req, res, next) => {
    const event = new Date()
    console.log('Admin Time:', event.toString())
    next()
})

// http://127.0.0.1:8888/condidat
/***************************************/
/*** Routage de la ressource Order    */

router.get('/condidats/:id',   condidatCtrl.getCondidat)



module.exports = router