const request = require('request')

const geocode = (address, callback) => {
    const curl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXVzdGFmYW1vaHNpbiIsImEiOiJjazdtMDdpZ3owMWtpM2VsaHRxY2RmYW1wIn0.U4Yeex5xfj_WXML5aEad3A&limit=1'
    
    request({url: curl,json : true}, (error,{body})=>{
 
     if(error){
         callback('Unable to connect to location services.',undefined)
     } else if (body.features.length === 0){
 
         callback('Unable to verify and find location', undefined)
 
     }else{
         callback(undefined, {
         latitude : body.features[0].center[1],
         longitude : body.features[0].center[0],
         location: body.features[0].place_name
     })
     
     }
 })
 
}

 module.exports = geocode