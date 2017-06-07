'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var DispFavList = require('./dispFavList');
var CityWeather = require('./getCityWeather');

var MainInterface = React.createClass({
    displayName: 'MainInterface',


    // initial state config
    getInitialState: function getInitialState() {
        return {

            title: 'Weather Information',
            city: '',
            searchRes: false,
            favList: ["new york", "london", "dubai", "tokyo", "hong kong", "mumbai"]
        };
    },

    // add cities to saved list
    addFav: function addFav() {
        if ($.inArray(this.state.city, this.state.favList) < 0 && this.state.city !== '') {
            var newList = this.state.favList.push(this.state.city);
            this.setState({
                favlist: newList
            });
        }
    },

    // delete city from saved list
    remFav: function remFav(remCity) {
        var index = this.state.favList.indexOf(remCity);
        // console.log(index, remCity);
        var newList;
        if (index > 0) {
            newList = this.state.favList.splice(index, 1);
            this.setState({
                favlist: newList
            });
        }
    },

    // configure react to render weather information for searched city
    getCityWeather: function getCityWeather(e) {

        this.setState({
            searchRes: true,
            city: this.refs.cityName.value.toLowerCase()
        }, function () {
            // console.log(this.state.city, this.state.searchRes);
            this.addFav();
        });

        e.preventDefault();
    },

    //Main Component render function
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'form',
                { id: 'searchCity', className: 'form-horizontal', onSubmit: this.getCityWeather },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement('div', { className: 'col-sm-2' })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement('div', { className: 'col-sm-2' }),
                    this.state.searchRes ? React.createElement(CityWeather, { city: this.state.city, remFav: this.remFav, remButton: false }) : null
                ),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-2 control-label' },
                        'City'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement('input', { type: 'text', className: 'form-control', ref: 'cityName',
                            placeholder: 'Enter name of city' })
                    )
                ),
                React.createElement('br', null),
                React.createElement('div', { className: 'col-sm-2' }),
                React.createElement(
                    'button',
                    { type: 'submit', className: 'btn btn-default' },
                    'Search'
                )
            ),
            React.createElement('hr', null),
            React.createElement(
                'h4',
                { style: { marginLeft: 50 } },
                'Saved List'
            ),
            React.createElement(
                'div',
                { id: 'content' },
                React.createElement(DispFavList, { favList: this.state.favList, remFav: this.remFav })
            )
        );
    }
});

// Render main component to the index.html
ReactDOM.render(React.createElement(MainInterface, null), document.getElementById('contentmain'));
//# sourceMappingURL=App.js.map