const request = require('request')

// Mapbox APIs Geocode
// request({
//     url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/Krakow,Poland.json?access_token=pk.eyJ1Ijoiemhla2Ftb3J1ZyIsImEiOiJja2diMGU4bGwwY2V4MnRzNWo2ZHF6ZDQxIn0.ncQm4-p0EvA4F8OgMXG52A&language=en',
//     json: true
// }, (error, response, body) => {
//     if (error) {
//         console.log('Unable to connect to Geocode service!')
//     } else if (body.features == false) {
//         console.log('The location was not found!')
//     } else {
//         console.log(body.features[0].place_name)
//         console.log('Latitude -->', body.features[0].center[1])
//         console.log('Longitude -->', body.features[0].center[0])
//     }
// })

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiemhla2Ftb3J1ZyIsImEiOiJja2diMGU4bGwwY2V4MnRzNWo2ZHF6ZDQxIn0.ncQm4-p0EvA4F8OgMXG52A&language=en'

    request({ url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Geocode service!', undefined)
        } else if (body.features == false) {
            callback('The address location was not found!', undefined)
        } else {
            callback(undefined, {location: body.features[0].place_name, latitude: body.features[0].center[1], longitude: body.features[0].center[0]})
        }
    })
}

module.exports = geocode