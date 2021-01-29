const db = require('../userService')

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).send('Missing authorization data')
    
    const authDataString = authHeader.split(' ')[1]
    const credentials = Buffer.from(authDataString, 'base64').toString('ascii')
    const [username, password] = credentials.split(':');

    const user = db.users.find(u => u.username === username)

    if (!user) return res.status(401).send('User does not exist')
    
    if (user.password !== password) return res.status(401).send('Invalid credentials')
    
    req.user = { name: user.name, username: user.username, loginTime: new Date() }
    
    next()
}