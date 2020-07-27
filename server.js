const path = require('path');
const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const upload = multer({ dest: 'imgs/' })

const PythonConnector = require('./PythonConnector.js');

var app = express();

app.set('views', path.join(__dirname, 'client', 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'client', 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function (req, res) {
    res.sendFile('client/views/index.html');
});

app.post('/predict', upload.single('img'), async function (req, res) {
    
    console.log(req.file)
    const { path } = req.file
    
    try {
        var result = await PythonConnector.invoke('function', path);
        res.send({predict:result});
        
        }
    catch (e) {
        console.log(`error in ${req.url}`, e);
        res.sendStatus(404);
    }

})


app.use(function (err, req, res, next) {
    if (err.status !== 404) return next(err);
    res.status(500);
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, async () => {
    console.log(`Started listening on port ${PORT} ...`);
    await PythonConnector.invoke('listen');
});
