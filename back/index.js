const express = require('express');
const handlebars = require('express-handlebars');

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

app.get('/', (req, res) => {
    // res.setHeader('Content-Type', 'text/plain');
    // res.send('index.html');
    // Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', {
        layout: 'index',
        helpers: {
            // toto: 'tata',
            // cleanUp () {
                // fetch('/api/save')
                // .then((response) => {
                //     console.log(response);
                // })
                // .catch((e) => {
                //     console.log(e);
                // });
            // }
        }
    });
    // res.render('main');
});

app.get('/api/cleanup', (req, res) => {
    console.log('### req:', req);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ test: 'toto' }));
});

app.listen(port, () => console.log(`App listening to port ${port}`));