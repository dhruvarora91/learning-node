const request = require('request')

const apiKey = '20d81477c63e1efb16ec0728cb7b9207'

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey + '&units=metric'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Internet!', undefined)
        } else if (response.body.message) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, response.body.weather[0].main + '. There is ' + response.body.main.temp + ' degrees outside and humidity is ' + response.body.main.humidity + '.')
        }
    })
}
module.exports = forecast
