

$("#searchBtn").on("click", function(event){
  var userInput = $("#search-form").val()
  event.preventDefault()
  
  weather(userInput)
});


  function weather(userInput){
    var weatherURL = 
    "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=cb31c15d977ada6c905bc4f191d03d92"



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

$("#current-icon").empty();
$("#current-icon").append(weatherIcon);

$(".city-name").text(userInput + " (" + date + ")");
$(".temp").text(temperature.toFixed(1) + "°F");
$(".humidity").text(humidity);
$(".wind").text(windSpeed.toFixed(1));
console.log(response)

});
  }
  
