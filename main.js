var express = require("express");
var app = express();
var fs = require("fs");

app.use('/', express.static(__dirname + '/public'));

app.get("/data", function(request, response){
  var jsonFile = fs.readFileSync('sample_bubbles.json');
  response.send(jsonFile);
});

app.listen(8080);
console.log("server listening on port 8080");