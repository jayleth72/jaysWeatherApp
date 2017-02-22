var APPID = "8eeb32ea7ed52941e3eabab4a021efd7"
var temp;
var loc;
var weatherIcon;
var humidity;
var wind;
var direction;

function updateByPostcode(postcode) {
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "zip=" + postcode +
    "&APPID=" + APPID;
  sendRequest(url);
}

function sendRequest(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
      var weather = {};
      weather.weatherIcon = data.weather[0].id;
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
      //weather.direction = degreesToDirection(data.wind.deg);
      weather.loc = data.name;
      weather.temp = kelvinToCelcius(data.main.temp);
      update(weather);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function degreesToDirection(degrees) {
  var range = 360/16;
  var low = 360 - range/2;
  var high = (low + range) % 360;
  var angles = ['N', 'NNE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  for(i in angles) {

    if (degrees >= low && degrees < high)
      return angles[i];

    low = (low + range) % 360;
    high = (high + range) % 360;
  }
  return "N";
}
function kelvinToCelcius(kelvinTemp) {
  return Math.round(kelvinTemp - 273.15);
}

function kelvinToFarenheit(kelvinTemp) {
  return Math.round(kelvinTemp * (9/5) -459.67)
}

function update(weather) {
  wind.innerHTML = weather.wind;
  temp.innerHTML = weather.temp;
  loc.innerHTML = weather.loc;
  humidity.innerHTML = weather.humidity;
  direction.innerHTML = weather.direction;

  weatherIcon.src = "assets/img/codes/" + weather.weatherIcon + ".png";

}

window.onload = function () {
  temp = document.getElementById("temperature");
  loc = document.getElementById("loc");
  weatherIcon = document.getElementById('weatherIcon');
  humidity = document.getElementById('humidity');
  wind = document.getElementById('wind');
  direction = document.getElementById('direction');

  updateByPostcode("0100/");


}
