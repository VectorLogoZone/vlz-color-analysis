// server.js
// where your node app starts

// init project
const express = require('express');
const fs = require('fs');
const getSvgColors = require("get-svg-colors");
const hbs = require('hbs');
const morgan = require('morgan');
const os = require('os');
const request = require('request');
const rp = require('request-promise-native');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('view engine', 'hbs');
app.set('views', './templates');
app.use(express.static('static'));

hbs.registerHelper('GOOGLE_ANALYTICS', function() { console.log("called!"); return process.env.GOOGLE_ANALYTICS;});
hbs.registerPartial("above", fs.readFileSync("./partials/above.hbs", "utf-8"));
hbs.registerPartial("below", fs.readFileSync("./partials/below.hbs", "utf-8"));

function sendJson(req, res, jsonObj) {
    if ('cb' in req.query)
    {
        res.jsonp(jsonObj);
    }
    else
    {
        res.json(jsonObj);
    }
}

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.get('/status.json', function(req, res) {
    const retVal = {};

    retVal["success"] = true;
    retVal["message"] = "OK";
    retVal["timestamp"] = new Date().toISOString();
    retVal["__dirname"] = __dirname;
    retVal["__filename"] = __filename;
    retVal["os.hostname"] = os.hostname();
    retVal["os.type"] = os.type();
    retVal["os.platform"] = os.platform();
    retVal["os.arch"] = os.arch();
    retVal["os.release"] = os.release();
    retVal["os.uptime"] = os.uptime();
    retVal["os.loadavg"] = os.loadavg();
    retVal["os.totalmem"] = os.totalmem();
    retVal["os.freemem"] = os.freemem();
    retVal["os.cpus.length"] = os.cpus().length;
    // too much junk: retVal["os.networkInterfaces"] = os.networkInterfaces();

    retVal["process.arch"] = process.arch;
    retVal["process.cwd"] = process.cwd();
    retVal["process.execPath"] = process.execPath;
    retVal["process.memoryUsage"] = process.memoryUsage();
    retVal["process.platform"] = process.platform;
    retVal["process.release"] = process.release;
    retVal["process.title"] = process.title;
    retVal["process.uptime"] = process.uptime();
    retVal["process.version"] = process.version;
    retVal["process.versions"] = process.versions;
    retVal["process.installPrefix"] = process.installPrefix;

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Max-Age", "604800");

    sendJson(req, res, retVal);
});

app.get('/api', asyncMiddleware(async (req, res, next) => {
  color_analysis(req, res, req.query.url);
}));

app.post('/api', asyncMiddleware(async (req, res, next) => {
  color_analysis(req, res, req.body.url);
}));
    
async function color_analysis(req, res, url) {

  if (url == null || url.length == 0) {
    sendJson(req, res, {"success": false, "message": "missing parameter 'url'"});
    return;
  }
  
  var options = {
    url: url,
    encoding: null,
    headers: {
      'User-Agent': 'vlz-color-analysis'
    },
    resolveWithFullResponse: true
  };
  
  var response;
  try {
    response = await rp(options);
    console.log(response);
  }
  catch (e) {
    sendJson(req, res, {"success": false, "message": e.message, "error": e });
    return;
  }
    /*if (error) {
      res.write("Error retrieving url '" + url + "': " + error);
      res.end();
      return;
    }*/
  var body = response.body;
  var buf = Buffer.from(body, 'binary');
  /*
    console.log("body buffer?", body instanceof Buffer);
    console.log("body buffer?", typeof body);
    var buf = Buffer.from(body, 'binary');
    var base64 = buf.toString('base64');
    res.write("HTTP Status      : " + (response && response.statusCode) + "\n");
    res.write("Content-Type     : " + response.headers['content-type'] + "\n");
    res.write("Content-Encoding : " + response.headers['content-encoding'] + "\n");
    res.write("Size             : " + body.length + "\n");
    res.write("Buffer size      : " + buf.length + "\n");
    res.write('Image            : <img style="max-width:256px;max-height:256px;vertical-align:top;border:1px solid black;background-color:ddd;" src="data:');
    res.write(response.headers['content-type']);
    res.write(';base64,');
    res.write(base64);
    res.write('" />\n');
  */
    const rawColors = getSvgColors(buf.toString('utf-8'), {flat: true});
  
  var colors = rawColors.map(color => color.hex().toUpperCase());
  colors = colors.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
  
  //var colors = {};
  //for (var color in rawColors) {
  //  colors[color.hex()] = true;
 // }
  //for (var loop = 0; loop < colors.length; loop++) {
  //  res.write("color #" + loop + "=" + colors[loop] + "\n");
  //}
  sendJson(req, res, { "success": true, "colors": colors, "url": url });
}

app.get('/', function(req, res) {
    res.render("index", { step: "url", recaptcha: process.env.RECAPTCHA_SITEKEY });
    return;
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
