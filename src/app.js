const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express ()

//Serving up public dir and the hbs dir
const publicPath = path.join(__dirname ,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//hbs engine set up
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//path to serve
app.use(express.static(publicPath))

//render hbs
app.get('', (req, res) => {
    res.render('index',{
        title: "Weather",
        name: "Mustafa Mohsin"
    })
})

//About page
app.get('/about',(req, res)=>{
    res.render('about', {
        title:'About Me',
        name: 'Mustafa Mohsin'
    })
})

//Help page
app.get('/help',(req, res)=>{
    res.render('help',{
        name:"Mustafa Mohsin",
        helpText: "This is the help page.",
        title: "Help page"
    })
})

//Creates server on port 3000
app.listen(3000, () => {
    console.log('Server is up')
})

//app.com/weather
app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
          error: 'You must provide an address!'
     })
    }

    geocode(req.query.address, (error ,{latitude, longitude,location}={}) => {

        if(error){

            return res.send({error})
        }

        forecast (latitude, longitude, (error, fdata) => {

            if(error){

                return res.send({error})
            }

            res.send({

                forecast: fdata,
                location,
                address: req.query.address

            })

        })

    })
    
})

app.get('/products', (req,res)=>{

    if(!req.query.search){
        res.send({
            error: 'You must provide a search term!'
        })
    }
    else{
    console.log(req.query.search)
    res.send({
        products:[]
    })
}
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404 Page',
        name: 'Mustafa Mohsin',
        errorMessage: 'Error! Help page article does not exist.'
    })
})

//app.com/errorHandler
app.get('*', (req,res)=>{
    res.render('404',{
        title: '404 Page',
        name: 'Mustafa Mohsin',
        errorMessage: 'Error! Page does not exist.'
    })
})

