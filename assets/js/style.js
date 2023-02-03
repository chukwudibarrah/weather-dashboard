var searchInput = $('#search-input');
var searchButton = $('#search-button');
var weatherToday = $('#today');
var weatherForecast = $('#forecast');
var searchHistory = $('#history');
var searchForm = $('#search-form');


$('#search-button').on('click', function(event) {
    event.preventDefault();

    var cityName = searchInput.val().trim();
    console.log('this is the city name: ' + cityName);

    buildQueryURL();
})



// function futureWeather()

// function currentWeather()

// function displayCity()

// function searchHistory()

function buildQueryURL() {
    var cityName = searchInput.val().trim();

       //get geocoding information from city
       var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=e2ede3072a6799282bf4796231458b6b";

       

    $.ajax({
        url: geoURL,
        method: "GET"
    }).then(function(response){
        var lat = response[0].lat;
        var lon = response[0].lon;

        // convert geocoding information to lat and lon details foweather api
       var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=e2ede3072a6799282bf4796231458b6b";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(results){
            console.log('the temp is ' + JSON.stringify(results.list[0].main.temp) + "°C");            
            console.log('the wind is ' + JSON.stringify(results.list[3].wind.speed) + "KPH");            
            console.log('the humidity is ' + JSON.stringify(results.list[0].main.humidity) + "%");          
        })

     
    
    })
}

// function clearForm()

// function clickButton()


