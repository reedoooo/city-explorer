import { MDBContainer } from "mdb-react-ui-kit/dist";
import React from "react";

class Map extends React.Component {
  render() {
    return (
      <MDBContainer>
        <div class="bg-image hover-overlay ripple">
          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.props.lat},${this.props.lon}&zoom=13&format=json`}
            class="img-fluid rounded"
            alt=""
          />
          <a class="ripple" href="#!">
            {" "}
            <div
              class="mask"
              style={{ backgroundcolor: "rgba(57, 192, 237, 0.2)" }}
            ></div>
          </a>
        </div>
      </MDBContainer>
    );
  }
}

export default Map;
