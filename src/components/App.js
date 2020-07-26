import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import apiKeys from "../APIKeys";
import "../css/App.css";
import forecast_logo from "../images/forecast_logo.svg";
import Week from "./Week";

// App will be the Outer component that is called by the DOM.
// It contains everything
class App extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      // Default values for Portland, OR address
      location: "Portland, OR",
      lat: 45.516018,
      lon: -122.681425,
      // Daily weather info for the week
      weekInfo: []
    };

    // Takes care of the location input from user
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // ****************

  // New Location was entered
  handleChange(event) {
    this.setState({ location: event.target.value });
  }

  // ****************

  // Location was entered and user hit search
  handleClick() {
    // If location is empty, don't render anything
    console.log("location", this.state.location);
    if (this.state.location === "") {
      this.setState({ weekInfo: [] });
      return;
    }
    // First, get the Longitude and Latitude of the location entered
    const locationURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKeys.mapQuestKey}&location=${this.state.location}`;

    fetch(locationURL)
      .then(res => res.json())
      .then(data => {
        // Save the queried latitudes and longitudes to the state
        console.log("Location Data Fetched", data);
        this.setState({
          lat: data.results[0].locations[0].latLng.lat,
          lon: data.results[0].locations[0].latLng.lng
        });
        // Get Weather data
        this.getWeatherData();
      })
      .catch(error => console.error("error", error)); // Catch any errors
  }

  // ****************

  // Calls API to fetch weather data
  getWeatherData() {
    // lat, lon : geographical coordinates
    // units : unit system for degrees etc.
    // part : optional param; exclude some data (current, minutely, hourly) and only get daily
    // api : unique API key
    const units = "imperial"; // Fahrenheit. Celsius: metric
    const part = "current,minutely,hourly";
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&units=${units}&exclude=${part}&appid=${apiKeys.openWeatherMapKey}`;

    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        // Save queried weather data for the week to the state
        console.log("Weather Data Fetched", data);
        this.setState({ weekInfo: data.daily });
      })
      .catch(error => console.error("error", error)); // Catch errors
  }

  // ****************

  // Renders the App. Initially, there is only a search bar, but whenever there is a location
  // entered, It will also render the daily weather info for the week through the Week component
  render() {
    return (
      <div className="App">
        {/**************** Navbar ******************/}
        <Navbar bg="light" variant="light" sticky="top">
          <Navbar.Brand>
            <img
              src={forecast_logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Forcast logo"
            />{" "}
            Forecast
          </Navbar.Brand>
        </Navbar>
        {/**************** App Body ******************/}
        <div className="App-body">
          {/**************** Location Search ******************/}
          <div className="Search">
            <InputGroup>
              <FormControl
                value={this.state.location}
                onChange={this.handleChange}
                aria-label="Location"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="light" onClick={this.handleClick}>
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          {/**************** Daily Weather Info for the Week ******************/}
          <div className="Week">
            <Week weekInfo={this.state.weekInfo}></Week>
          </div>
        </div>
        {/**************** Footer ******************/}
        <div className="App-footer">
          <Navbar bg="light" variant="light">
            <Nav.Item className="ml-auto">
              <FontAwesomeIcon icon={faCopyright} /> Angelic Phan
            </Nav.Item>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default App;
