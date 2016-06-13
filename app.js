// var Twitter = require('Twitter')
var Twit = require('twit')
var GoogleMapsAPI = require('googlemaps')
var cn = require('chuck-norris-api')
var cowsay = require('cowsay')
var pry = require('pryjs')
// var bootstrap = require('bootstrap')
var jQuery = require('jquery')
var express = require('express')
var app = express()
var mustacheExpress = require('mustache-express')

app.engine('html',mustacheExpress())
app.set('view engine','html')
app.set('views',__dirname+'/html')
app.use(express.static(__dirname+'/public'))

// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

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

app.listen(3000, function(){
  console.log('App is listening on port 3000!')
})
function getData(){
  var tweets = []
  var loc = []
  T.get('search/tweets', { q: '#ShakeShack' count: 1000 }, function(err, data, response) {
    console.log(data)
    eval(pry.it)
    // var tweets = []
    for(var i = 0; i < data.statuses.length; ++i){
      if(data.statuses[i].geo != null){
        tweets.push(data.statuses[i])
      }
    }
    //console.log(tweets[0])
    for(var i = 0; i < tweets.length; ++i){
      loc.push(tweets[i].geo.coordinates)
    }
    // loc.splice(-1,1)
    console.log(loc)
    //eval(pry.it)
  })
  return loc;
}

app.get('/', function(req, res){
  //eval(pry.it)
  var loc = getData()
  res.render('index.html', loc)
})

