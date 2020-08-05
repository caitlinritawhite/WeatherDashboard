

$("#searchBtn").on("click", function(event){
  var userInput = $("#search-form").val()
  event.preventDefault()
  
  weather(userInput)

    $('#five-day-content').empty();
    $("#current-icon").empty();
});



function weather(userInput){
    var weatherURL = 
    "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=cb31c15d977ada6c905bc4f191d03d92"


localStorage.setItem("city", userInput)

var cityNames = localStorage.getItem(userInput)
$("#city-storage").text(cityNames)

    $.ajax({
      url: weatherURL,
      type: "GET"
    }).then(function(response){

var kelvinTemp = response.list[0].main.temp;
var temperature = (kelvinTemp - 273.15) * 1.80 + 32;
var date = moment().format('MM/DD/YYYY')
var humidity = response.list[0].main.humidity;
var windSpeed = response.list[0].wind.speed;


var weatherIcon = $("<img>");
        weatherIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");


$("#current-icon").append(weatherIcon);
$(".city-name").text(userInput + " (" + date + ")");
$(".temp").text(temperature.toFixed(1) + "°F");
$(".humidity").text(humidity + "%");
$(".wind").text(windSpeed.toFixed(1) + " MPH");

var latitude = response.city.coord.lat;
var longitude =  response.city.coord.lon;

var coordinateURL = "http://api.openweathermap.org/data/2.5/uvi?appid=e5f561d692ee5b0d5bfef99cb764f31d&lat=" + latitude + "&lon=" + longitude;


$.ajax({
  url: coordinateURL,
  method: "GET"
}).then(function (uvIndex) {
var currentUV = uvIndex.value

$(".uv-index").text(currentUV);
$(".uv-index").css({"background-color": "rgb(243, 57, 88)", "color": "white", "border-radius": "5px", "padding": "3px"})



  });


});

var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=cb31c15d977ada6c905bc4f191d03d92"


$.ajax({
  url: forecastURL,
  method: "GET"
}).then(function (forecast) {

  for (i=2; i<40; i+=8){
    //new div for 5 day forecast
    var forecastDiv = $('<div>').attr("id", "number" + [i]).addClass('col-2 five-days');

    //get the date
    var weekday = forecast.list[i].dt_txt;
    //format the date
    weekday = weekday.slice(0, 10);
    //create html element for the date
        weekday = $('<p>').text(weekday)

    //get weather icon for the date
    var weekIcon = forecast.list[i].weather[0].icon;
    weekIcon = $('<img>').attr('src', "https://openweathermap.org/img/w/" + weekIcon + ".png")

    //get temperature
    var weekTemp = forecast.list[i].main.temp
    var farWeekTemp = (weekTemp - 273.15) * 1.80 + 32;

    farWeekTemp = $("<p>").text("Temp: " + farWeekTemp.toFixed(1) + "°F")

    //get humidity
    var weekHumidity = forecast.list[i].main.humidity;
    weekHumidity = $("<p>").text("Humidity: " + weekHumidity)


  var final = $(forecastDiv).append(weekday, weekIcon, farWeekTemp, weekHumidity)
        $('#five-day-content').append(final)


  }

  console.log(forecast)






  });



}