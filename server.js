/************************************/
/*** Import des modules nécessaires */
const express = require('express')
const cors = require('cors')
const TokenMiddleware = require('./middlewares/TokenMiddleware')
const errorHandler = require('./errors/errorHandler')


/************************************/
/*** Import de la connexion à la DB */
let DB = require('./DbContext')

/*****************************/
/*** Initialisation de l'API */
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/***********************************************************************************************/
/*** download une image ou d'autres fichiers statiques à partir du serveur                    */
/*** Ouvrez n'importe quel navigateur et accédez à http://127.0.0.1:8888/photos/8BD002203.jpg */

// const options = {
//     dotfiles: 'ignore',
//     etag: false,
//     extensions: ['htm', 'html'],
//     index: false,
//     maxAge: '1d',
//     redirect: false,
//     setHeaders: function (res, path, stat) {
//       res.set('x-timestamp', Date.now())
//     }
//   }
// app.use(express.static('public', options))
// app.use('/photos', express.static('photos'))

app.use(express.static('public'))

/***********************************/
/*** Import du module de routage */
const auth_router = require('./routes/auth')
const admin_router = require('./routes/admin')
const condidat_router = require('./routes/condidat')
const mix_router = require('./routes/mix')


/******************************/
/*** Mise en place du routage */

/**************************************************************************************************/
/*** Middleware appliqué niveau application c-a-d toutes les routes passeront par ce middelware. */
/************************************** Remarqué ici app.use(middelware) ************************/
app.use( (req, res, next) => {
    const event = new Date()
    console.log('All Time:', event.toString())
    next()
})

app.get('/', (req, res) => res.send(`I'm online. All is OK !`))
/*** Middleware appliqué niveau route c-a-d chaque route est controlée par un middleware ici il s'agit du même middleware mais avec des paramètres différents. */
app.use('/auth', auth_router)
app.use('/admin', TokenMiddleware(["admin"]), admin_router) // toutes routes qui se trouvent dans admin_router sont fermées(pour tout public), et elles sont fermées aussi pour quelques utilisateurs authentifiés except admin
app.use('/condidat', TokenMiddleware(["condidat"]), condidat_router) // toutes routes qui se trouvent dans admin_router sont fermées(pour tout public), et elles sont fermées aussi pour quelques utilisateurs authentifiés except employee
app.use('/mix', TokenMiddleware(["admin", "employee", "customer", "supplier"]), mix_router) // toutes routes qui se trouvent dans admin_router sont fermées(pour tout public), par contre tous les utilisateurs authentifiés peuvent y acceder


app.get('*', (req, res) => res.status(501).send('What the hell are you doing !?!'))

app.use(errorHandler)


/********************************/
/*** Start serveur avec test DB */
DB.sequelize.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, '0.0.0.0', () => {
            // console.log(`This server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
            console.log(`Server is running on port ${process.env.SERVER_PORT}`);
        })
    })
    .catch(err => console.log('Database connection Error', err))

