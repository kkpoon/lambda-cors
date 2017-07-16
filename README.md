# lambda-cors

## Installation

```shell
npm install lambda-cors
```

## Usage

In AWS API Gateway, it could ONLY set one origin for CORS.

To allow multiple origins, we could delay the CORS check to lambda execution.

This library adds the CORS headers automatically to the response.

```javascript
var CORS = require("lambda-cors");

var cors = CORS({
    origins: ["http://domain1.com", "http://domain2.com"];
})

exports.handler = cors(function(event, context, callback) {
    // ... your request handler

    var res = { statusCode: 200, body: "Hello" };
    callback(null, res);
});
```


