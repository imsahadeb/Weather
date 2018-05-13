

var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
var path =require('path');
var server = require('http');
//var io = require('socket.io')(server);

//Webhook

app.post('webhook',function(req,res){
    if(!req.body) return res.sendStatus(400)
    {
        res.setHeader('Contet-type', 'application/json');
        var city = req.body.queryResult.parameters['geo-city'];
        var w = getWether(city);

        let response="";
        let responseObj ={
            "fulfillmentText": response
            ,"fulfillmentMessafes": [{
                "text":{
                    "text":[w]
                }
            }]
            ,"Source":""
        }
    }
    return res.json(responseObj);
});

//api working
 var apiKey = "4e06f74e7d04fbe7e6a1ab369a2a5079";
 var result;
 function cb(err,response,body){
     if(err){
         consol.log('error:',error);
     }

     var weather = JSON.parse(body)
     if(weather.message==='city not found'){
         result='Unable to get wether '+weather.message;
     }

     else{
         result='Right Now its '+weather.main.temp + 'degree with ' +weather.weather[0].description;
     }
 }


 function getWether(city){
     result=undefined;
     var url ='http://api.openweathermap.org/data/2.5/weather?q=$(city)&appid=4e06f74e7d04fbe7e6a1ab369a2a5079';
     var req=request(url,cb);
     while(result===undefined){
         require('deasync').runLoopOnce();
     }
     return result;

 }

 app.listen(process.env.PORT || 8000);
