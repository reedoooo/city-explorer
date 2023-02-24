import React from 'react';
import Map from "./Map";
import Weather from "./Weather";
import Movies from "./Movies";
import axios from 'axios';
import { Container, Modal, Form, Button } from 'react-bootstrap';

const LOCATION_API_KEY = process.env.REACT_APP_LOCATION_KEY;

const APP_SERVER = process.env.REACT_APP_SERVER;

console.log(APP_SERVER);

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            displayInfo: false,
            showModal: false,
            searchInput: '',
            location: {},
            locationResults: [],
            weatherResults: [],
            movieResults: [],
            error: null
        };
    }

    handleSearchInput = async (e) => {
        let searchResult = e.target.value;
        this.setState({
            searchInput: searchResult
        },
            () => console.log(this.state.locationResults)
        )
    }

    handleLocationSearch = async (e) => {

        try {
            let request = {
                locationUrl: `https://us1.locationiq.com/v1/search?key=${LOCATION_API_KEY}&q=${this.state.searchInput}&format=json`,
                method: 'GET'
            }

            let response = await axios(request);
            this.setState({
                locationResults: response.data[0],
            });

        } catch (e) {
            this.setState({
                showModal: true
            });
        }
    }

    handleWeatherSearch = async (e) => {

        try {
            let weatherUrl = `${APP_SERVER}/weather?searchQuery=${this.state.locationResults}`
            let response = await axios.get(weatherUrl)
            this.setState({
                weatherResults: response.data
            })
        }

        catch (error) {
            this.setState({
                showModal: true
            })
        }
    };

    handleMovieSearch = async (e) => {

        try {
            let moviesUrl = `${APP_SERVER}/movies?searchQuery=${this.state.locationResults}`;
            let response = await axios.get(moviesUrl)
            this.setState({
                movieResults: response.data
            })
        }

        catch (error) {
            this.setState({
                showModal: true
            })
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
                location: this.state.locationResults
            });
        } catch (error) {
            this.setState({
                showModal: true
            })
        }
    }

    closeModal = () => {
        this.setState({
            showModal: false
        });
    };

    render() {
        console.log(this.state)
        return (
            <main>
                <Container>
                    <Form className='mainForm' onSubmit={this.displayLocation}>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" onInput={this.handleSearchInput} />
                        </Form.Group>
                        <Button onClick={this.displayLocation} className="mainButton">Explore!</Button>
                    </Form>
                </Container>
                {this.state.displayInfo &&
                    <>
                        <h2>{this.state.location.display_name}</h2>
                        <p>Lat: {this.state.location.lat}</p>
                        <p>Lon: {this.state.location.lon}</p>
                        <Map lat={this.state.location.lat} lon={this.state.location.lon} />

                        <div>
                            {this.state.weatherResults.length > 0 &&
                                <Weather weatherResults={this.state.weatherResults} />
                            }
                        </div>

                        <div>
                            {this.state.movieResults.length > 0 &&
                                <Movies movieResults={this.state.movieResults} />
                            }
                        </div>
                    </>
                }
                <Modal
                    show={this.state.showModal}
                    onHide={this.closeModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>The information you've entered is not valid. Please try again.</p>
                    </Modal.Body>
                </Modal>
            </main>
        )
    }
}

export default Main
