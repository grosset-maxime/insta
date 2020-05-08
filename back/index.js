const express = require('express');
const handlebars = require('express-handlebars');
require('dotenv').config();

const app = express();
const port = 8080;

// Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

// Sets handlebars configurations
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    // defaultLayout: 'planB',
}));

app.use(express.static('public'));
app.use(express.static('static'));

app.get('/', (req, res) => {
    // Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', {
        layout: 'index',
        helpers: {}
    });
    // res.render('main');
});

app.get('/api/cleanup', async (req, res) => {
    // console.log('### req:', req);

    if (process.env.PATH_CLEANUP == null) {
        throw new Error('Missing process.env.PATH_CLEANUP.');
    }

    let success;
    const cleanup = require('./api/cleanup');

    try {
        await cleanup.run();
        // await cleanup.test();
        success = true;
    } catch (e) {
        console.error(e);
        success = false;
    }

    const resp = {
        success,
        PATH_CLEANUP: process.env.PATH_CLEANUP
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(resp));
});

app.listen(port, () => console.log(`App listening to port ${port}`));