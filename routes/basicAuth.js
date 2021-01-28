const express = require('express')
const auth = require('../middlewares/basicAuth')

const router = express()

router.get('/', auth, (req, res) => {
    return res.send(req.user)
})

module.exports = router
