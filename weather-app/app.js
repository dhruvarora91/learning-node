const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {

  console.log("Enter the location!")

} else {

  geocode(process.argv[2], (error, geocodedData) => {
    if (error) {
      return console.log(error)
    }

    const { latitude, longitude, location } = geocodedData

    forecast(latitude, longitude, (error, forecastedData) => {
      if (error) {
        return console.log(error)
      }
      console.log(location)
      console.log(forecastedData)
    })
  })

}
