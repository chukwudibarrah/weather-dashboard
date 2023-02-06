var cityName = $('#search-input').val().trim();


$('#search-button').on('click', function(event) {
    event.preventDefault();

    var cityName = $('#search-input').val().trim();
    if (!cityName) {
        alert('Please enter a city to search for.');
    }

    buildQueryURL(cityName);
    searchHistory();
    getForecast(cityName);
    clearForm();

    $('#search-input').val('');
})

function displayCity() {
    // event.preventDefault();
    var cityName = $(this).attr('data-name');
    // alert('I have been clicked!');
    // console.log(theCityName);

    // var cityName = $('#search-input').val().trim();
    // if (!cityName) {
    //     alert('Please enter a city to search for.');
    // }

    buildQueryURL(cityName);
    searchHistory();
    getForecast(cityName);
    clearForm();
}
$(document).on('click', '.city-button', displayCity);

function searchHistory() {
    var searchHistory = []; // array to store the user search history
    var button = $('<button>'); // li tags to display the cities later

    var cityName = $('#search-input').val().trim();
    var theCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    searchHistory.unshift(theCity);

    // if (searchHistory.includes(theCity)) {
    //     return;
    // }

    // var hr = $('hr');
    // hr.addClass('div-line');
    // hr.text('----------------------------------------');
    // $('.weather-hr').append(hr);

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


function buildQueryURL(cityName) {
    // var cityName = $('#search-input').val().trim();
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
            var weatherIcon = 'https://openweathermap.org/img/wn/' + (results.list[1].weather[0].icon) + '.png';

            var icon = $('<img>')
            .addClass('weather-icon')
            .attr('src', weatherIcon);

            $('#today').append(('<h2>') + theCity + " " + "(" + dayDate + ")" + ('</h2>'));
            $('#today').append(icon);
            
            // display current weather data to page
            $('#today').append(($('<p>').addClass('weather-metrics')).text('Temp: ' + temp));
            $('#today').append(($('<p>').addClass('weather-metrics')).text('Wind: ' + wind));
            $('#today').append(($('<p>').addClass('weather-metrics')).text('Humidity: ' + humidity));

            // display future weather data to page
            var h3 = $('<h3>');
            h3.addClass('forecast-title');
            h3.text("5-Day Forecast:")

            $('#forecast').prepend(h3);
            // $('#forecast').prepend($('<h3>').text("5-Day Forecast:"));
        })
    })
}


function getForecast(cityName) {
    // var cityName = $('#search-input').val().trim();
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

            $('#display-forecast-1').append(($('<p>').addClass('forecast-metric forecast-date')).text(moment(results.list[6].dt_txt).format('DD/MM/YYYY')));
            $('#display-forecast-1').append(($('<img>').addClass('forecast-metric icon')).attr('src', 'https://openweathermap.org/img/wn/' + (results.list[6].weather[0].icon) + '.png'));
            $('#display-forecast-1').append(($('<p>').addClass('forecast-metric')).text("Temp: " + JSON.stringify(results.list[6].main.temp) + "°C"));
            $('#display-forecast-1').append(($('<p>').addClass('forecast-metric')).text("Wind: " + JSON.stringify(results.list[6].wind.speed) + " KPH"));
            $('#display-forecast-1').append(($('<p>').addClass('forecast-metric')).text("Humidity: " + JSON.stringify(results.list[6].main.humidity) + "%"));

            $('#display-forecast-2').append(($('<p>').addClass('forecast-metric forecast-date')).text(moment(results.list[14].dt_txt).format('DD/MM/YYYY')));
            $('#display-forecast-2').append(($('<img>').addClass('forecast-metric icon')).attr('src', 'https://openweathermap.org/img/wn/' + (results.list[14].weather[0].icon) + '.png'));
            $('#display-forecast-2').append(($('<p>').addClass('forecast-metric')).text("Temp: " + JSON.stringify(results.list[14].main.temp) + "°C"));
            $('#display-forecast-2').append(($('<p>').addClass('forecast-metric')).text("Wind: " + JSON.stringify(results.list[14].wind.speed) + " KPH"));
            $('#display-forecast-2').append(($('<p>').addClass('forecast-metric')).text("Humidity: " + JSON.stringify(results.list[14].main.humidity) + "%"));

            $('#display-forecast-3').append(($('<p>').addClass('forecast-metric forecast-date')).text(moment(results.list[22].dt_txt).format('DD/MM/YYYY')));
            $('#display-forecast-3').append(($('<img>').addClass('forecast-metric icon')).attr('src', 'https://openweathermap.org/img/wn/' + (results.list[22].weather[0].icon) + '.png'));
            $('#display-forecast-3').append(($('<p>').addClass('forecast-metric')).text("Temp: " + JSON.stringify(results.list[22].main.temp) + "°C"));
            $('#display-forecast-3').append(($('<p>').addClass('forecast-metric')).text("Wind: " + JSON.stringify(results.list[22].wind.speed) + " KPH"));
            $('#display-forecast-3').append(($('<p>').addClass('forecast-metric')).text("Humidity: " + JSON.stringify(results.list[22].main.humidity) + "%"));

            $('#display-forecast-4').append(($('<p>').addClass('forecast-metric forecast-date')).text(moment(results.list[30].dt_txt).format('DD/MM/YYYY')));
            $('#display-forecast-4').append(($('<img>').addClass('forecast-metric icon')).attr('src', 'https://openweathermap.org/img/wn/' + (results.list[30].weather[0].icon) + '.png'));
            $('#display-forecast-4').append(($('<p>').addClass('forecast-metric')).text("Temp: " + JSON.stringify(results.list[30].main.temp) + "°C"));
            $('#display-forecast-4').append(($('<p>').addClass('forecast-metric')).text("Wind: " + JSON.stringify(results.list[30].wind.speed) + " KPH"));
            $('#display-forecast-4').append(($('<p>').addClass('forecast-metric')).text("Humidity: " + JSON.stringify(results.list[30].main.humidity) + "%"));

            $('#display-forecast-5').append(($('<p>').addClass('forecast-metric forecast-date')).text(moment(results.list[38].dt_txt).format('DD/MM/YYYY')));
            $('#display-forecast-5').append(($('<img>').addClass('forecast-metric icon')).attr('src', 'https://openweathermap.org/img/wn/' + (results.list[38].weather[0].icon) + '.png'));
            $('#display-forecast-5').append(($('<p>').addClass('forecast-metric')).text("Temp: " + JSON.stringify(results.list[38].main.temp) + "°C"));
            $('#display-forecast-5').append(($('<p>').addClass('forecast-metric')).text("Wind: " + JSON.stringify(results.list[38].wind.speed) + " KPH"));
            $('#display-forecast-5').append(($('<p>').addClass('forecast-metric')).text("Humidity: " + JSON.stringify(results.list[38].main.humidity) + "%"));

        })

    })
}


function clearForm() {
    $('#today').empty();
    $('.weather-forecast').empty();
    $('.forecast-title').empty();
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

