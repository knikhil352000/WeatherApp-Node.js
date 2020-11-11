const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = process.env.apikey;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?units=" + units +"&q=" + query +"&appid=" + apiKey +"";
  https.get(url,function(response){
  // console.log(response);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      // console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      // console.log(weatherDescription);
      res.write("<p>The weather description is " + weatherDescription + "</p>");

      res.write("<h1>The temperature in "+ query +" is " + temp + " Degree Celcius</h1>");
      //Only you can send one send
      res.send();
      // console.log(weatherData);
      //
      // const Object = {
      //   name: "Nikhil",
      //   branch: "CSE"
      // }
    // console.log(JSON.stringify(Object));
    });
  });
});


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
