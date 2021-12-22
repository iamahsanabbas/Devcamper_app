
const NodeGeocoder = require('node-geocoder');
const options = {
   provider: 'mapquest',
   httpAdapter: 'https',
   apiKey: "BnG39xruhVojnhVAHqYZAPXwAmDLAImO",
   formatter: null
};
const geocoder = NodeGeocoder(options);
module.exports = geocoder;
