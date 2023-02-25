import React from "react";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit/dist";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {
  render() {
    return (
      <MDBCard>
        <MDBCardBody>
          <h2 class="h2">Daily Forecast:</h2>
          {this.props.weatherResults.map((item, idx) => (
            <WeatherDay item={item} key={idx} />
          ))}
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default Weather;
