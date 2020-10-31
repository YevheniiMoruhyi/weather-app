const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve; Note: this is requires in order to serve css/js files in .hbs templates
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {title: 'Weather'})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Me', name: 'Yevhenii Moruhyi'})
})

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help page', content: 'Something useful'})
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'No address was provided'})
    }

    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return res.send({error})
        } else {
            forecast(latitude, longitude, (error, {currentTemp, feelslikeTemp}  = {}) => {
                if (error) {
                    return res.send({error})
                } else {
                    res.send({location, currentTemp, feelslikeTemp})
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {title: 'Help', page: 'Help page'})
})

app.get('*', (req, res) => {
    res.render('404', {title: '404', page: 'Page'})
})

app.listen(port, () => {
    console.log('Express server has started on port ' + port)
})
