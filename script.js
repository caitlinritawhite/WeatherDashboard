

$("button").on("click", function(){
  event.preventDefault()
    var cityName = $("#search-form").val()
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=cb31c15d977ada6c905bc4f191d03d92" 


    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        
        console.log(response)

      });



});