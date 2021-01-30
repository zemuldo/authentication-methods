const express = require('express')
const RS256 = require('../middlewares/RS256Token')
const HS256 = require('../middlewares/HS256Token')
const userService = require('../userService')

const router = express()

router.post('/rsa-sha-256/signin', (req, res) => {
    const { username, password } = req.body;
    const user = userService.users.find(u => u.username === username)

    if (!user) return res.status(401).send('User does not exist')

    if (user.password !== password) return res.status(401).send('Invalid credentials')

    const token = RS256.createToken({ userid: user.userid, exp: new Date().getTime() + (1 * 60 * 60 * 1000) })
    return res.send({ token })
})
router.get('/rsa-sha-256/protected', RS256.auth, (req, res) => {
    return res.send("Token is valid and user is allowed.")
})

router.post('/hmac-sha-256/signin', (req, res) => {
    const { username, password } = req.body;
    const user = userService.users.find(u => u.username === username)

    if (!user) return res.status(401).send('User does not exist')

    if (user.password !== password) return res.status(401).send('Invalid credentials')

    const token = HS256.createToken({ userid: user.userid, exp: new Date().getTime() + (1 * 60 * 60 * 1000) })
    return res.send({ token })
})
router.get('/hmac-sha-256/protected', HS256.auth, (req, res) => {
    return res.send("Token is valid and user is allowed.")
})

module.exports = router
