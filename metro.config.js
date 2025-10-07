const { withNativeWind } = require('nativewind/metro');
const config = {}
 
module.exports = withNativeWind(config, { input: './app/globals.css' })