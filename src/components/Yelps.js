import React from "react";

class Yelps extends React.Component {
  render() {
    return (
      <>
        {this.props.item.name}
        {this.props.item.image_url}
        {this.props.item.price}
        {this.props.item.rating}
        {this.props.item.url}
      </>
    );
  }
}

export default Yelps;
