var twitter = require('Twitter')
var maps = require('googlemaps')
var cn = require('chuck-norris-api')
var cowsay

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var publicConfig = {
  key: process.env.GOOGLEMAPS_API_KEY,
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
};
var gmAPI = new GoogleMapsAPI(publicConfig);

function talkCow(text){
  var command = 'cowsay '+text
  var cmd = command
  exec(cmd, function(error, stdout, stderr) {
    console.log(stdout)
  });
}
