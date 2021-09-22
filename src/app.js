
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

//Defina paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirPath));



app.get('/about', (req, res) => res.render('about', {
    title: 'About me',
    name: 'Juliana'
}));

app.get('/help', (req, res) => res.render('help', {
    text: 'Let me help!',
    title: 'Help',
    name: 'Juliana'
}));

app.get('', (req, res) => res.render('index', {
    title: 'Weather app',
    name: 'Juliana'
}));

// app.get('/help', (req, res) => res.send({
//     name: 'Juliana',
//     age: 22
// }));

// app.get('/about', (req, res) => res.send('<h1>About page</h1>'));

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address is required'
        })
    }
    geocode(req.query.address, (error, { longitude = 0, latitude = 0, location = '' } = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
    
        forecast(longitude, latitude, (err, { description = '', temperature = 0, feelslike = 0, humidity = 0 } = {}) => {
            if(err) {
                return res.send({
                    error: err
                })
            }
            res.send({
                location,
                forecast: {
                    description,
                    temperature,
                    feelslike,
                    humidity
                },
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(req.query.search) {
        return res.send({
            products: []
        });
    }
    res.send({
        error: 'The search is required'
    })
    
})
app.get('/help/*', (req, res) => res.render('error', {
    title: 'Error 404',
    name: 'Juliana',
    text: 'Article not found'
}));

app.get('*', (req, res) => res.render('error', {
    title: 'Error 404',
    name: 'Juliana',
    text: 'Page not found'
}));



app.listen(port, () => {
    console.log('server is up on port 3000');
});