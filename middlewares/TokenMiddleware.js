const jwt = require('jsonwebtoken')

const extractBearer = authorization => {
    if (typeof authorization !== 'string') {
        return false
    }
    const matches = authorization.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]

}

const TokenMiddleware = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization && extractBearer(req.headers.authorization)
        if (!token) {
            return res.status(401).json({ message: 'Ho le petit malin !!!' })
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Bad token' })
            }
            if(decodedToken.roles.some(role => roles.includes(role))){
                global.guId = decodedToken.id
                next()
            }else{
                return res.status(401).json({ message: 'Insufficient privileges' })
            }
        })
        // next() // il faut enlever next() decomenter le code
    }
}

module.exports = TokenMiddleware