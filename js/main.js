
   window.onload = function()
   {
   if (navigator.geolocation)
   {
   navigator.geolocation.getCurrentPosition(onSuccess, onError,
   {maximumAge:60*1000, timeout:5*60*1000, enableHighAccuracy:true});
   }
   else
   document.getElementById("weather").innerHTML = "Your browser does not support HTML5 Geolocation!!!";
   }
   function onSuccess(position)
   {
   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;
   var xmlhttpweather = new XMLHttpRequest();
   var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=bf8e0bbc155f8a1158a9116948bcb423";
   xmlhttpweather.open("GET", url, false);
   xmlhttpweather.send();
   if (xmlhttpweather.readyState == 4 && xmlhttpweather.status == 200)
   {
   var jsonResponse = xmlhttpweather.responseText;
   var weatherInfo = eval("(" + jsonResponse + ")");
   var location = weatherInfo.name;
   var output = "<p><b>Weather Updates :  " + location + "</b></p>";
   var description = weatherInfo.weather[0].description;
   var temperature = Math.round((weatherInfo.main.temp - 273.15)*100)/100;
   var pressure = weatherInfo.main.pressure;
   var humidity = weatherInfo.main.humidity;
   var windspeed = weatherInfo.wind.speed;
  //  output += "<table><tr><td>Description:</td><td>" + description + "</td></tr>";
   output += "<p>Description: " + description + "</p>";
   output += "<p>temperature: " + temperature + + '0'.sup() + "</p>";
   output += "<p>pressure: " + pressure + "hpa</p>";
   output += "<p>humidity: " + humidity + "% </p>";
   output += "<p>windspeed: " + windspeed + "m/s </p>";

   document.getElementById("weather").innerHTML = output;
   }
   }
   function onError(error)
   {
   switch(error.code)
   {
   case PERMISSION_DENIED:
   alert("User denied permission");
   break;
   case TIMEOUT:
   alert("Geolocation timed out");
   break;
   case POSITION_UNAVAILABLE:
   alert("Geolocation information is not available");
   break;
   default:
   alert("Unknown error");
   break;
   }
 }
