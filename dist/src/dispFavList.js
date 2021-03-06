'use strict';

/**
 * Created by Johns on 6/6/2017.
 */
var React = require('react');
var CityWeather = require('./getCityWeather');
var ReactDOM = require('react-dom');

//Saved List Subcomponent
var DispFavList = React.createClass({
    displayName: 'DispFavList',

    render: function render() {

        //fetch saved list from properties
        var cityList = this.props.favList;
        // console.log(cityList);

        //Map iterator for saved list cities
        cityList = cityList.map(function (city, index) {

            //Render HTML elements for saved cities
            return React.createElement(
                'li',
                { className: 'list-group-item', style: { width: 600 }, key: index },
                React.createElement(CityWeather, { city: city, remFav: this.props.remFav, remButton: true })
            );
        }, this);
        //Render city list
        return React.createElement(
            'ul',
            { className: 'list-group', style: { marginLeft: 300, float: 'center' } },
            cityList
        );
    }
});

//Export subcomponent to main component
module.exports = DispFavList;
//# sourceMappingURL=dispFavList.js.map