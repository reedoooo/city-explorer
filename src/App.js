import React from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Form, FormControl, Button, Image, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


const ACCESS_TOKEN = process.env.REACT_APP_LOCATIONKEY;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      results: [],
      error: null
    };
  }

  handleSearch = async (e) => {
    try {
      let request = {
        url: `https://us1.locationiq.com/v1/search?key=${ACCESS_TOKEN}&q=${this.state.searchInput}&format=json`,
        method: 'GET'
      }

      let response = await axios(request);

      this.setState({
        results: response.data,
      });

    } catch (e) {
      console.log(e);
      this.setState({ error: e });
    }
  }

  handleInput = async (e) => {
    let value = e.target.value;

    this.setState({
      searchInput: value,
    });
  }

  render() {
    let condition = this.state.searchInput && this.state.results.length;
    console.log(this.state.results);

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#">City Explorer</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Form className="d-flex mx-auto">
                <FormControl type="search" placeholder="Enter a city" aria-label="Search" className="mr-2 search-input" onChange={this.handleInput} />
                <Button variant="outline-primary" className="explore-btn" onClick={this.handleSearch}>Explore</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="my-5">
          {condition
            ? <BrowserRouter>
              <Nav variant="pills" defaultActiveKey="/maps" className="mb-4">
                <Nav.Item>
                  <Nav.Link as={Link} to="/maps">Maps</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/weather">Weather</Nav.Link>
                </Nav.Item>
              </Nav>
              <Routes>
                <Route path='/maps' element={
                  <div className="city-container">
                    {this.state.results.map(city => (
                      <div key={city.place_id} className="city-details">
                        <h2>{city.display_name}</h2>
                        <Image

                          src={`https://maps.locationiq.com/v3/staticmap?key=${ACCESS_TOKEN}&center=${city.lat},${city.lon}&zoom=10`}
                          alt={city.display_name} />
                      </div>
                    ))}
                  </div>
                } />
                <Route path='/weather' element={<h2>Weather Component goes here</h2>} />
              </Routes>
            </BrowserRouter>
            : <h2 className="no-city">Please search for a city</h2>
          }
        </Container>
        {this.state.error
          ? <Alert variant="danger" onClose={() => this.setState({ error: null })} dismissible>
            <p>Something went wrong: {this.state.error.message}</p>
          </Alert>
          : null}
      </div>
    );
  }
}

export default App;