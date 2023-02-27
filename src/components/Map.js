import React from "react";
import { Container } from "react-bootstrap";

class Map extends React.Component {
  render() {
    return (
      <Container>
        <img
          src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.props.latitude},${this.props.longitude}&zoom=13&format=json`}
          alt=""
        />
        {console.log(this.props.latitude)}
      </Container>
    );
  }
}

export default Map;
