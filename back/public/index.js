var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});

app.get('/api/cleanup', (req, res) => {
    // console.log('### req:', req);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({}));
});

app.listen(8080);