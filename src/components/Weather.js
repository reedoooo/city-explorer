import React from "react";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {
  render() {
    return (
      <>
        <h2 className="mb-3">Daily Forecast:</h2>
        {this.props.weatherResults.map((item, idx) => (
          <WeatherDay item={item} key={idx} />
        ))}
        {console.log("weather working")}
      </>
    );
  }
}

export default Weather;
