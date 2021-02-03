const express = require('express')
const bodyParser = require('body-parser')

const app = express()
require('./keys')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/basic', require('./routes/basicAuth'))
app.use('/bearer-token', require('./routes/bearerToken'))

app.get('*', (req, res) => res.send('Hello from Geeks Conner'))

app.listen(process.env.PORT, () => console.log(`App started on http://localhost:${process.env.PORT}`))
