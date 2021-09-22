const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5a80fb6c5388a9ee36243d286fb6c857&query=' + latitude + ',' + longitude + '&units=f';
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Can not connect to the forecast sevice', undefined);
        } else if(body) {
            if(body.current) {
                const { current: { temperature, feelslike, weather_descriptions: description, humidity } } = body;
                callback(undefined, {
                    description,
                    temperature,
                    feelslike,
                    humidity
                });
            } else if(body.error) {
                callback(body.error.info, undefined);
            }
        }
    });
}

module.exports = forecast;