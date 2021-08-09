const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000    // port used by heroku, but to run locally port 3000 is used

// Defines paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)  // this is to set the custom path to views directory
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    // render allows us to render onw of our views / handlebars
    res.render('index', {
        title: 'Weather',
        name: 'Dhruv Arora'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dhruv Arora'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Dhruv Arora'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        })
    }

    geocode(req.query.address, (error, geocodedData) => {
        if (error) {
            return res.send({
                error: error // can also be rewritten as res.send({ error })
            })
        }
        const { latitude, longitude, location } = geocodedData

        forecast(latitude, longitude, (error, forecastedData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                weather: forecastedData,
                address: req.query.address
            })
        })
    })


    // res.send({
    //     location: req.query.address,
    //     forecast: '40 degrees'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Dhruv Arora',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page not found',
        name: 'Dhruv Arora',
    })
})

// Start the server
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})
