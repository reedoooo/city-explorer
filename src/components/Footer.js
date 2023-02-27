import {
  MDBCol,
  MDBContainer,
  MDBFooter,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Follow me on LinkedIn or Github</span>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/reed-vogt-a11ba8260/"
              className="me-4 text-reset"
            >
              <MDBIcon color="secondary" fab icon="linkedin" />
            </a>
            <a href="https://github.com/reedoooo" className="me-4 text-reset">
              <MDBIcon color="secondary" fab icon="github" />
            </a>
          </div>
        </section>
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon color="secondary" icon="gem" className="me-3" />
                  City Explorer
                </h6>
                <p>
                  An application for your location
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon color="secondary" icon="home" className="me-2" />
                  Seattle, Wa 98112, US
                </p>
                <p>
                  <MDBIcon color="secondary" icon="envelope" className="me-3" />
                  readvogt@gmail.com
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </MDBFooter>
    );
  }
}

export default Footer;
