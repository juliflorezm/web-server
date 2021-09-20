const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianVsaWFuYWZsb3Jlem0iLCJhIjoiY2t0cTR6NW91MHQ1bDJ1bnU5dnMyZGtkaiJ9.Ev_0mjAR8T0-K2FntAVUdg';
    request({ url, json: true }, (error, response) => {
        if(error) {
            callback('Can not connect to the service', undefined);
        } else if(response) {
            const { features } = response.body;
            if(features.length === 0) {
                callback('There are no matches. Try again about other search', undefined);
            } else {
                callback(undefined, {
                    latitude: features[0].center[1],
                    longitude: features[0].center[0],
                    location: features[0].place_name
                });
            }
        }  
    });
}


module.exports = geocode;