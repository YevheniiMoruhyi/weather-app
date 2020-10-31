const request = require('request')

// const options = {
//     url: 'http://api.weatherstack.com/current?access_key=891027052123ffd78fe9937f99dd31cb&query=Krakow,Poland',
//     json: true
// }

// request(options, (error, response, body) => {
//     if (error) {
//         console.log('Unable to connect to wheatherstack service!')
//     } else if (body.error) {
//         console.log('The location was not found!')
//     } else {
//         console.log('It\'s currently', body.current.temperature, 'degrees out. It feels like', body.current.feelslike)
//     }
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=891027052123ffd78fe9937f99dd31cb&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to wheatherstack service!', undefined)
        } else if (body.error) {
            callback('The location was not found!', undefined)
        } else {
            callback(undefined, { currentTemp: body.current.temperature, feelslikeTemp: body.current.feelslike})
        }
    })
}

module.exports = forecast