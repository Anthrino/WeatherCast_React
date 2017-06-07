var React = require('react');
var ReactDOM = require('react-dom');
var DispFavList = require('./dispFavList');
var CityWeather = require('./getCityWeather');

var MainInterface = React.createClass({

    // initial state config
    getInitialState: function () {
        return {

            title: 'Weather Information',
            city: '',
            searchRes: false,
            favList: ["new york", "london", "dubai", "tokyo", "hong kong", "mumbai"]
        }

    },

    // add cities to saved list
    addFav: function () {
        if ($.inArray(this.state.city, this.state.favList) < 0 && this.state.city !== '') {
            var newList = this.state.favList.push(this.state.city);
            this.setState({
                favlist: newList
            });
        }

    },

    // delete city from saved list
    remFav: function (remCity) {
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
    getCityWeather: function (e) {

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
    render: function () {
        return (
            <div>

                {/*search form*/}
                <form id="searchCity" className="form-horizontal" onSubmit={ this.getCityWeather }>
                    <div className="form-group">
                        <div className="col-sm-2"/>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-2"/>
                        { this.state.searchRes ?
                            <CityWeather city={this.state.city} remFav={ this.remFav } remButton={false}/> : null }
                    </div>
                    <br/>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">City</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" ref="cityName"
                                   placeholder="Enter name of city"/>
                        </div>
                    </div>
                    <br/>
                    <div className="col-sm-2"/>
                    <button type="submit" className="btn btn-default">Search</button>
                </form>

                <hr/>
                <h4 style={{marginLeft: 50}}>Saved List</h4>

                {/*Marker to render saved list subcomponent*/}
                <div id="content">
                    <DispFavList favList={ this.state.favList } remFav={ this.remFav }/>
                </div>
            </div>
        )
    }
});

// Render main component to the index.html
ReactDOM.render(
    <MainInterface />,
    document.getElementById('contentmain')
);