import React from "react";
import Yelps from "./yelps";

class Yelp extends React.Component {
  render() {
    return (
      <>
        <h2>Yelps:</h2>
        {this.props.yelpResults.map((item, idx) => (
          <Yelps item={item} key={idx} />
        ))}
      </>
    );
  }
}

export default Yelp;
