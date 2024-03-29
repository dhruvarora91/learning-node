const request = require('request')

const apiKey = 'pk.eyJ1IjoiZGhydXZhcm9yYTkxIiwiYSI6ImNrZXU1d3llYTBta3QzM3A3dHRyYzBvemUifQ.lXgbSID3Uff9zwWvpGQ9Kg'

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + apiKey + '&limit=1'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Internet!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location! Try another search', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode
