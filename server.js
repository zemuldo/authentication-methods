const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 4000
require('./keys')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/basic', require('./routes/basicAuth'))
app.use('/bearer-token', require('./routes/bearerToken'))

app.get('*', (req, res) => res.send('Hello from Geeks Conner'))

app.listen(PORT, () => console.log(`App started on http://localhost:${PORT}`))
