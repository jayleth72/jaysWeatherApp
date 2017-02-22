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
      weather.direction = data.wind.deg;
      weather.loc = data.name;
      weather.temp = data.main.temp;
      update(weather);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
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

  updateByPostcode(87110);


}
