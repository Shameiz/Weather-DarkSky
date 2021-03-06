const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

//config
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handlebars views and location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:"Shameiz"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About',
        name:"Shameiz"
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        name:"Shameiz"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Provide Address"
        })
    }
    var address = req.query.address
    geocode(address, (error,{latitude,longitude,location} = {}) => {
        if (error){
            return res.send({ error })
        }
        forecast(longitude,latitude,(error,forecastData) => {
            if (error){
                return res.send({ error })
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "Provide Search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404 Help',
        name:"Shameiz",
        errorMessage: "Help Article not found"
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        name:"Shameiz",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})