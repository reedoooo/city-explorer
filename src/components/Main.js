import React from "react";
import Map from "./Map";
import Weather from "./Weather";
import Movies from "./Movies";
import axios from "axios";
import { MDBContainer } from "mdb-react-ui-kit";
import { MDBBtn } from "mdb-react-ui-kit";
import { Modal, Form } from "react-bootstrap";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      displayInfo: false,
      showModal: false,
      error: null,
      searchInput: "", //city
      location: {},
      locationResults: [],
      weatherResults: [],
      movieResults: [],
      location_name: "",
      lat: "",
      lon: "",
    };
  }

  handleSearchInput = async (e) => {
    let searchResult = e.target.value;
    this.setState(
      {
        searchInput: searchResult,
      },
      () => console.log(this.state.searchResult)
    );
  };

  handleLocationSearch = async () => {
    try {
      let request = {
        locationUrl: `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchInput}&format=json`,
        method: "GET",
      };

      let response = await axios(request);
      this.setState({
        locationResults: response.data,
        location_name: response.data[0].display_name,
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      });
    } catch (error) {
      this.setState({
        showModal: true,
      });
    }
  };

  handleWeatherSearch = async () => {
    try {
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.searchInput}`;
      let response = await axios.get(weatherUrl);
      this.setState({
        weatherResults: response.data,
      });
    } catch (error) {
      this.setState({
        showModal: true,
      });
    }
  };

  handleMovieSearch = async () => {
    try {
      let moviesUrl = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.searchInput}`;
      let response = await axios.get(moviesUrl);
      this.setState({
        movieResults: response.data,
      });
    } catch (error) {
      this.setState({
        showModal: true,
      });
    }
  };

  displayLocation = async (e) => {
    e.preventDefault();
    try {
      await this.handleLocationSearch();

      await this.handleWeatherSearch();
      await this.handleMovieSearch();

      this.setState({
        displayInfo: true,
        location: this.state.locationResults[0],
      });
    } catch (error) {
      this.setState({
        showModal: true,
      });
    }
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    console.log(this.state);
    return (
      <main>
        <MDBContainer>
          <MDBCard>
            <MDBCardBody>
              <div className="p-5 text-center bg-light">
                <h1 className="mb-3">City Explorer</h1>
                <Form className="mainForm" onSubmit={this.displayLocation}>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      onInput={this.handleSearchInput}
                    />
                  </Form.Group>
                  <MDBBtn
                    onClick={this.displayLocation}
                    className="mainButton"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
                    }}
                  >
                    Explore!
                  </MDBBtn>
                </Form>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <MDBContainer>
          <MDBCard>
            <MDBCardBody>
              {this.state.displayInfo && (
                <>
                  <h2>{this.state.location_name}</h2>
                  <p>Lat: {this.state.lat}</p>
                  <p>Lon: {this.state.lon}</p>
                  <Map
                    lat={this.state.lat}
                    lon={this.state.lon}
                  />

                  <div>
                    {this.state.weatherResults.length > 0 && (
                      <Weather weatherResults={this.state.weatherResults} />
                    )}
                  </div>

                  <div>
                    {this.state.movieResults.length > 0 && (
                      <Movies movieResults={this.state.movieResults} />
                    )}
                  </div>
                </>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              The information you've entered is not valid. Please try again.
            </p>
          </Modal.Body>
        </Modal>
      </main>
    );
  }
}

export default Main;
