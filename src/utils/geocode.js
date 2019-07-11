const request = require('request')
const geocode = (address,callback) => {
    const urlLocation = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2hhbWVpeiIsImEiOiJjanhjcjR0dHowNmZrNDB0Z3E0OW9ib3ozIn0.meiXre2jB6axZqPv5HyTqw&limit=1"
    request({url:urlLocation, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!',undefined)
        } else if(body.features==undefined || body.features.length === 0){
            callback("Unable to find location", undefined)
        } else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode