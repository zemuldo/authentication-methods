const express = require('express')

const app = express()

app.use('/basic', require('./routes/basicAuth'))

app.listen(4000, () => console.log('App started on http://localhost:4000'))