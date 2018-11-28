
# Color Analysis [<img alt="TIL Logo" src="https://color.vectorlogo.zone/favicon.svg" height="90" align="right" />](https://color.vectorlogo.zone/)

[VLZ Color Analysis](https://color.vectorlogo.zone/) is an API (and web interface for testing it) to extract the colors used in an SVG file.

Really just a wrapper for [get-svg-colors](https://github.com/colorjs/get-svg-colors) so it can be used from [VectorLogoZone](https://www.vectorlogo.zone/), which is a static site.

## Running

It is a simple node app: `npm install` then `node server.js`.

## Calling the API

The endpoint is `/api`.  It takes a single parameter `url` that should be the full URL of an SVG file.  Both `GET` and `POST` will work.
[Try it!](https://color.vectorlogo.zone/api?url=https://www.vectorlogo.zone/logos/vectorlogozone/vectorlogozone-ar21.svg)

The return is a JSON object with a `colors` property that is an array of colors found in the SVG.  Example:
```json
{
  "success": true,
  "colors": [
    "#1D8286"
  ],
  "url": "https://www.vectorlogo.zone/logos/vectorlogozone/vectorlogozone-ar21.svg"
}
```

You can call is as JSONP by passing a `callback` parameter.

## Contributing

Contributions are welcome!  Please follow the standard Github [Fork & Pull Request Workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962)

## License

[GNU Affero General Public License v3.0](LICENSE.txt)

## Credits

[![express.js](https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg)](https://expressjs.com/ "Web Framework")
[![Git](https://www.vectorlogo.zone/logos/git-scm/git-scm-ar21.svg)](https://git-scm.com/ "Version control")
[![Github](https://www.vectorlogo.zone/logos/github/github-ar21.svg)](https://github.com/ "Code hosting")
[![Google Analytics](https://www.vectorlogo.zone/logos/google_analytics/google_analytics-ar21.svg)](https://www.google.com/analytics "Traffic Measurement")
[![Handlebars](https://www.vectorlogo.zone/logos/handlebarsjs/handlebarsjs-ar21.svg)](http://handlebarsjs.com/ "Templating")
[![JavaScript](https://www.vectorlogo.zone/logos/javascript/javascript-ar21.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript "Programming Language")
[![Node.js](https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg)](https://nodejs.org/ "Application Server")
[![npm](https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg)](https://www.npmjs.com/ "JS Package Management")
[![Shoelace CSS](https://www.vectorlogo.zone/logos/shoelacestyle/shoelacestyle-ar21.svg)](https://shoelace.style/ "CSS")
[![Zeit](https://www.vectorlogo.zone/logos/zeit/zeit-ar21.svg)](https://www.zeit.co/ "Hosting")

* [get-svg-colors](https://github.com/zeke/get-svg-colors)


