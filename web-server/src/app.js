const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

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
    res.send({
        location: 'Delhi',
        forecast: '40 degrees'
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
app.listen('3000', () => {
    console.log('Server is running on port 3000')
})