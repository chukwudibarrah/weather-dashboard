// var searchInput = $('#search-input');
// var searchButton = $('#search-button');
// var weatherToday = $('#today');
// var weatherForecast = $('#forecast');
// var searchHistory = $('#history');
// var searchForm = $('#search-form');

// obtain today's date from momentjs
var todaysDate = moment().format('DD/MM/YYYY');
// console.log('the date today: ' + todaysDate);

var theDate = moment().add(1, 'days').format('DD/MM/YYYY');
// console.log('in three days: ' + theDate);

// var newDate = moment(JSON.stringify(results.list[index].dt_txt)).format('DD/MM/YYYY');
// console.log('this is the formatted date:' + newDate);


$('#search-button').on('click', function(event) {
    event.preventDefault();

    var cityName = $('#search-input').val().trim();
    if (!cityName) {
        alert('Please enter a city to search for.');
    }

    buildQueryURL();
    searchHistory();
    getForecast();
    clearForm();
})


function searchHistory() {
    var searchHistory = []; // array to store the user search history
    var button = $('<button>'); // li tags to display the cities later

    var cityName = $('#search-input').val().trim();
    var theCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    searchHistory.unshift(theCity);

    // add city name data tags to cities
    button.attr("data-name", theCity);
    button.addClass("list-group-item btn city-button");

    // searchHistory.length = 1;
    
    for (i = 0; i < 4; i++) {
        if (!cityName) {
            return;
        } else {
        // console.log('this is the search history: ' + searchHistory[i]);
        $('#history').append(button.text(searchHistory[i]));

        localStorage.setItem('city', theCity);
        displayHistory();

        }
        
    }
}

function buildQueryURL() {
    var cityName = $('#search-input').val().trim();
    var theCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);

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
            var dayDate = moment(results.list[0].dt_txt).format('DD/MM/YYYY');
            var temp =  JSON.stringify(results.list[0].main.temp) + "°C";
            var wind =  JSON.stringify(results.list[3].wind.speed) + " KPH";
            var humidity = JSON.stringify(results.list[0].main.humidity) + "%";
            var weatherIcon = results.list[1].weather[0].icon;

            $('#today').append(('<h2>') + theCity + " " + "(" + dayDate + ")" + " " + weatherIcon + ('</h2>'));

            // display current weather data to page
            $('#today').append(($('<p>').addClass('weather-metrics')).text('Temp: ' + temp));
            $('#today').append(($('<p>').addClass('weather-metrics')).text('Wind: ' + wind));
            $('#today').append(($('<p>').addClass('weather-metrics')).text('Humidity: ' + humidity));

            // display future weather data to page
            $('#today').append($('<h3>').text("5-Day Forecast:"));
        })
    })
}


function getForecast() {
    var cityName = $('#search-input').val().trim();
    var theCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);

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

            $('#display-forecast-1').append(($('<li>').addClass('list-group-item')).text(moment(results.list[6].dt_txt).format('DD/MM/YYYY')));
            $('#display-forecast-1').append(($('<li>').addClass('list-group-item')).text(results.list[6].weather[0].icon));
            $('#display-forecast-1').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[6].main.temp) + "°C"));
            $('#display-forecast-1').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[6].wind.speed) + " KPH"));
            $('#display-forecast-1').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[6].main.humidity) + "%"));

            $('#display-forecast-2').append(($('<li>').addClass('list-group-item')).text(moment(results.list[14].dt_txt).format('DD/MM/YYYY')));
            $('#display-forecast-2').append(($('<li>').addClass('list-group-item')).text(results.list[14].weather[0].icon));
            $('#display-forecast-2').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[14].main.temp) + "°C"));
            $('#display-forecast-2').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[14].wind.speed) + " KPH"));
            $('#display-forecast-2').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[14].main.humidity) + "%"));

            $('#display-forecast-3').append(($('<li>').addClass('list-group-item')).text(moment(results.list[22].dt_txt).format('DD/MM/YYYY')));
            $('#display-forecast-3').append(($('<li>').addClass('list-group-item')).text(results.list[22].weather[0].icon));
            $('#display-forecast-3').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[22].main.temp) + "°C"));
            $('#display-forecast-3').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[22].wind.speed) + " KPH"));
            $('#display-forecast-3').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[22].main.humidity) + "%"));

            $('#display-forecast-4').append(($('<li>').addClass('list-group-item')).text(moment(results.list[30].dt_txt).format('DD/MM/YYYY')));
            $('#display-forecast-4').append(($('<li>').addClass('list-group-item')).text(results.list[30].weather[0].icon));
            $('#display-forecast-4').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[30].main.temp) + "°C"));
            $('#display-forecast-4').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[30].wind.speed) + " KPH"));
            $('#display-forecast-4').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[30].main.humidity) + "%"));

            $('#display-forecast-5').append(($('<li>').addClass('list-group-item')).text(moment(results.list[38].dt_txt).format('DD/MM/YYYY')));
            $('#display-forecast-5').append(($('<li>').addClass('list-group-item')).text(results.list[38].weather[0].icon));
            $('#display-forecast-5').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[38].main.temp) + "°C"));
            $('#display-forecast-5').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[38].wind.speed) + " KPH"));
            $('#display-forecast-5').append(($('<li>').addClass('list-group-item')).text(JSON.stringify(results.list[38].main.humidity) + "%"));

        })

    })
}

function clearForm() {
    $('#today').empty();
    $('.weather-forecast').empty();
}

function displayHistory() {
    var button = $('<button>');
    button.attr("data-name", theCity);
    button.addClass("list-group-item btn city-button");

    var theCity = localStorage.getItem('city')

    if (!theCity) {
        return;
    // } else {
    //     $('#history').append(button.text(theCity));
    }
}

