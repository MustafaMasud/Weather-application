const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/9e7364ec743330a7e620a30a8963afc9/' +encodeURIComponent(latitude)+ ',' +encodeURIComponent(longitude)+'?units=si'
    request({url: url,json: true}, (error, {body} ) => {

        if (error){ 
            callback('Could not connect to weather services.', undefined)
    
        } else if (body.error){
    
            callback('Unable to find location')
    
        } else {
        
        callback(undefined, 
            
            body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +' degrees Celsius. The temperature high for today is ' + body.daily.data[0].temperatureHigh +', and the temperature low is ' + body.daily.data[0].temperatureLow+  '. There is a ' +body.currently.precipProbability + '% chance of rain'

        )
        }

         
     })


 }

 module.exports=  forecast