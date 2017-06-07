/**
 * Created by Johns on 6/6/2017.
 */
var React = require('react');
var Axios = require('axios');

// Weather information api subcomponent
var CityWeather = React.createClass({

    render: function () {
        var request = new XMLHttpRequest();
        var query = "http://api.openweathermap.org/data/2.5/weather?q=" + this.props.city + "&appid=2e53d90b411afb0bfef965f318b48dbb";
        var weatherData = {};

        //API request alternatives
        // request.open('GET', query, true);
        // request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // console.log(request.responseText);
        // request.onreadystatechange = function () {
        //     if (request.readyState === 4 && request.status === 200) {
        //         weatherData = JSON.parse(request.responseText);
        //     }
        //     else if (request.readyState === 4 && request.status !== 200) {
        //         alert('error');
        //     }
        //     request.send();
        // };
        // Axios.get(query).then(function (response) {
        //     console.log(response.data);
        //     weatherData = JSON.parse(response.text);
        // });

        //AJAX request to openweather api
        $.ajax(
            {   async: false,
                type: 'GET',
                url: query,
                success: function (result) {
                    //Parsing response data into JSON objects
                    weatherData.name = result.name;
                    weatherData.main = result.weather[0].main;
                    weatherData.description = result.weather[0].description;
                    weatherData.temp = result.main.temp;
                    // console.log(weatherData);
                }
            }
        );
        // console.log(weatherData);

        // Rendering Weather Info for requested city
        return (<div style={{ flexDirection: 'row', marginLeft: 50}}>
                    <h3 id={weatherData.name ? weatherData.name.toLowerCase() : null} ref="cityName">{weatherData.name}</h3>
                    { this.props.remButton ? <button type="button" className="btn btn-danger" style={{ float: 'right'}} onClick={ this.remCity }>Remove</button> : null }
                    <h4>Forecast: {weatherData.main} , mostly {weatherData.description}</h4>
                    <span>Temp: {Math.round(weatherData.temp) - 273} 'C</span>
           </div>
        )
    },

    //Process Remove button click and pass to main component
    remCity: function(e){
        var remCity = this.refs.cityName.id;
        this.props.remFav(remCity);

    }


});

//Export subcomponent for use across other components
module.exports = CityWeather;