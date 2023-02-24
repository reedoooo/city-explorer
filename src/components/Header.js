import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import React from "react";

class Header extends React.Component {
  render() {
    return (
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand tag="span" className="mb-0 h1">
            Home
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    );
  }
}

export default Header;
