const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'https://api.darksky.net/forecast/d15e60da25b40999275697cb42950284/'+latitude+','+longitude+'?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!',undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        }
        else {
            const currentStats = body.currently
            callback(undefined,body.daily.data[0].summary+ " It is currently "+currentStats.temperature+" and there is a "+currentStats.precipProbability+" probability of precipitation")
        }
    })
}

module.exports = forecast