const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

const send = require('./routes/send');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.use('/send', send);

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
