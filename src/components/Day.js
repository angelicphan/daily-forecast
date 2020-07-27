import React from "react";
import "../css/Day.css";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

// This component is called by the Week Component to render a day's weather
// information.
class Day extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    // Flag for whether or not to show a day's weather details
    this.state = {
      show: false
    };
    this.handleDeetsView = this.handleDeetsView.bind(this);
  }

  // ****************

  // Opens or closes Day detail Modal by updating the flag
  handleDeetsView() {
    var flag = false;
    if (this.state.show === false) {
      flag = true;
    }
    this.setState({
      show: flag
    });
  }

  // ****************

  // Renders the basic weather details of a day:
  // Day of the week, the date, the weather icon, and the average temp
  // during the day and night
  renderBasicDeets(today) {
    const icon = today.weather[0].icon;
    const dayTemp = today.temp.day.toFixed(0);
    const nightTemp = today.temp.night.toFixed(0);
    const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
      <Table className="Day" borderless>
        <thead>
          <tr>
            <th>
              {this.props.name} <br /> {this.props.date}
            </th>
          </tr>
        </thead>
        <tbody className="Day-Body">
          <tr>
            <td>
              <img src={imageURL} alt="weather icon" />
            </td>
          </tr>
          <tr>
            <td id="Basic-Temp">
              {dayTemp}&deg; / {nightTemp}&deg;
            </td>
          </tr>
          <tr>
            <td className="Details" onClick={this.handleDeetsView}>
              Details
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }

  // ****************

  // Renders a modal of more weather details for the day:
  // Sunrise/sunset times, info about percipitation, wind, visibility, and humidity
  renderDeets(today) {
    var sunrise = new Date(today.sunrise * 1000);
    sunrise = sunrise.getHours() + ":" + sunrise.getMinutes() + " AM";
    var sunset = new Date(today.sunset * 1000);
    sunset = sunset.getHours() - 12 + ":" + sunset.getMinutes() + " PM";
    var rain = today.rain ? (today.rain / 25.4).toFixed(2) : 0;
    var wind_deg = calculateWindDeg(today.wind_deg);
    return (
      <Modal
        className="Day"
        show={this.state.show}
        onHide={this.handleDeetsView}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.name} {this.props.date}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="Day-Body">
          {today.weather[0].description}, with a high of {today.temp.max}
          &deg; and a low of {today.temp.min}&deg;
          <Table size="sm" bordered>
            <tbody>
              <tr>
                <td>
                  <div className="Table-label">SUNRISE</div>
                  <div>{sunrise}</div>
                </td>
                <td>
                  <div className="Table-label">SUNSET</div>
                  <div>{sunset}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="Table-label">CHANCE OF RAIN</div>
                  <div>{today.pop}%</div>
                </td>
                <td>
                  <div className="Table-label">PRECIPITATION</div>
                  <div>{rain} in</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="Table-label">HUMIDITY</div>
                  <div>{today.humidity}%</div>
                </td>
                <td>
                  <div className="Table-label">WIND</div>
                  <div>
                    {wind_deg} {today.wind_speed} mph
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="Table-label">CLOUDINESS</div>
                  <div>{today.clouds}%</div>
                </td>
                <td>
                  <div className="Table-label">UV INDEX</div>
                  <div>{today.uvi}</div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    );
  }

  // ****************

  // Renders only the basic weather info for a day initially,
  // but has the ability to render a modal of more details upon activation
  render() {
    const today = this.props.dayInfo;
    const basicDetails = this.renderBasicDeets(today);
    const details = this.renderDeets(today);
    return (
      <div>
        <div>{basicDetails}</div>
        <div>{details}</div>
      </div>
    );
  }
}

export default Day;
// ******************************************************************

// Calculate wind_deg or the direction at which the wind blows as a String
// based on degree
function calculateWindDeg(wind_deg) {
  if (
    (wind_deg > 348.75 && wind_deg <= 360) ||
    (wind_deg >= 0 && wind_deg <= 11.25)
  ) {
    return "N";
  } else if (wind_deg > 11.25 && wind_deg <= 33.75) {
    return "NNE";
  } else if (wind_deg > 33.75 && wind_deg <= 56.25) {
    return "NE";
  } else if (wind_deg > 56.25 && wind_deg <= 78.75) {
    return "ENE";
  } else if (wind_deg > 78.75 && wind_deg <= 101.25) {
    return "E";
  } else if (wind_deg > 101.25 && wind_deg <= 123.75) {
    return "ESE";
  } else if (wind_deg > 123.75 && wind_deg <= 146.25) {
    return "SE";
  } else if (wind_deg > 146.25 && wind_deg <= 168.75) {
    return "SSE";
  } else if (wind_deg > 168.75 && wind_deg <= 191.25) {
    return "S";
  } else if (wind_deg > 191.25 && wind_deg <= 213.75) {
    return "SSW";
  } else if (wind_deg > 213.75 && wind_deg <= 236.25) {
    return "SW";
  } else if (wind_deg > 236.25 && wind_deg <= 258.75) {
    return "WSW";
  } else if (wind_deg > 258.75 && wind_deg <= 281.25) {
    return "W";
  } else if (wind_deg > 281.25 && wind_deg <= 303.75) {
    return "WNW";
  } else if (wind_deg > 303.75 && wind_deg <= 326.25) {
    return "NW";
  } else if (wind_deg > 326.25 && wind_deg <= 348.75) {
    return "NNW";
  }
  return "";
}
