import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";

class Map extends React.Component {
  render() {
    return (
      <MDBContainer>
        <img
          src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.props.lat},${this.props.lon}&zoom=13&format=json`}
          alt=""
        />
        {console.log(this.props.lat)}
      </MDBContainer>
    );
  }
}

export default Map;
