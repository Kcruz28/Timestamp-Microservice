// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  console.log(req.params['date']);

  if (!req.params['date']) {
    let now = new Date();
    return res.json({ "unix": now.getTime(), "utc": now.toUTCString() });
  }

  if (/^\d+$/.test(req.params['date'])){
    timestamp = new Date(+req.params['date'])
  } else {
    timestamp = new Date(req.params['date'])
  }
  
  
  console.log(timestamp);
  if (isNaN(timestamp) == true) {
    res.json({"error": "Invalid Date"});
  }
  
  res.json({"unix": timestamp.getTime(), "utc": timestamp.toUTCString()});
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
