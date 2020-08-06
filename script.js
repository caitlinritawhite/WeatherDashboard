
//When the search button is clicked - take the value of the user input, stop default and run weather function 
//Also clear any input from previous searches
$("#searchBtn").on("click", function(event){
  var userInput = $("#search-form").val()
  event.preventDefault()

  
  cityLibrary.push(userInput)

  weather(userInput)
  renderCities()

    $('#five-day-content').empty();
    $("#current-icon").empty();
    $("#search-form").val("");
});

//Here is our weather function that runs when the search button is clicked

function weather(userInput){
  //here is our API
    var weatherURL = 
    "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=cb31c15d977ada6c905bc4f191d03d92"

//running ajax to get our information from our API
    $.ajax({
      url: weatherURL,
      type: "GET"
    }).then(function(response){

//Get the current temperature from the api and convert to farenheit
var kelvinTemp = response.list[0].main.temp;
var temperature = (kelvinTemp - 273.15) * 1.80 + 32;

//get the date and display it in the correct format
var date = moment().format('MM/DD/YYYY')

//get the humidity from the api
var humidity = response.list[0].main.humidity;

//get the wind speed from the api
var windSpeed = response.list[0].wind.speed;

//get the weather icon from the API
var weatherIcon = $("<img>");
        weatherIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");

//append the information to the page
$("#current-icon").append(weatherIcon);
$(".city-name").text(userInput + " (" + date + ")");
$(".temp").text(temperature.toFixed(1) + "°F");
$(".humidity").text(humidity + "%");
$(".wind").text(windSpeed.toFixed(1) + " MPH");


//get the latitude and longitude to get the uv index
var latitude = response.city.coord.lat;
var longitude =  response.city.coord.lon;

//new API for the uv index information
var coordinateURL = "https://api.openweathermap.org/data/2.5/uvi?appid=e5f561d692ee5b0d5bfef99cb764f31d&lat=" + latitude + "&lon=" + longitude;

//run ajax again to get the information from the new API
$.ajax({
  url: coordinateURL,
  method: "GET"
}).then(function (uvIndex) {
  //get the value of the UV index from the api
var currentUV = uvIndex.value

//append the uv index to the page and style it
$(".uv-index").text(currentUV);
$(".uv-index").css({"background-color": "rgb(243, 57, 88)", "color": "white", "border-radius": "5px", "padding": "3px"})



  });


});

//getting information from the API for the 5 day forcast
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=cb31c15d977ada6c905bc4f191d03d92"


$.ajax({
  url: forecastURL,
  method: "GET"
}).then(function (forecast) {


  //for loop - starting at the 2nd index of the array - going through the entire array (40 items) and adding 8 every time (since they are 3 hour intervals)
  for (i=2; i<40; i+=8){
    //new div for 5 day forecast
    var forecastDiv = $('<div>').attr("id", "number" + [i]).addClass('col-2 five-days');

    //get the date
    var weekday = forecast.list[i].dt_txt;
    //format the date
    weekday = weekday.slice(0, 10);
    weekday= moment(weekday).format("MM/DD/YYYY")
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

//append the information to the screen
  var final = $(forecastDiv).append(weekday, weekIcon, farWeekTemp, weekHumidity)
        $('#five-day-content').append(final)


  }


  

  console.log(forecast)






  });


}

var cityLibrary = []
function renderCities() {
  $("#city-storage").empty()


// Loop through the array of movies, then generate buttons for each movie in the array
for(i=0; i<cityLibrary.length; i++){

var cityDiv = $("<div>").attr("id", "city" + [i])
 var cityBtn = $("<button>").text(cityLibrary[i]).addClass("city-button");
 var finalDiv = $(cityDiv).prepend(cityBtn)
$("#city-storage").prepend(finalDiv);
localStorage.setItem('key'+[i],cityLibrary[i])
}

$(".city-button").on("click", function(){
  var cityInput = $(this).text()

  $('#five-day-content').empty();
  $("#current-icon").empty();
  weather(cityInput)
});
}





