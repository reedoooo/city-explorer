import { MDBCard, MDBCardBody } from "mdb-react-ui-kit/dist";
import React from "react";
import Movie from "./Movie";

class Movies extends React.Component {
  render() {
    return (
      <MDBCard>
        <MDBCardBody>
          <h2 class="h2">Movies:</h2>
          {this.props.movieResults.map((item, idx) => (
            <Movie
              key={idx}
              title={item.title}
              overvew={item.overvew}
              average_votes={item.average_votes}
              total_votes={item.total_votes}
              poster={item.poster_path}
              popularity={item.popularity}
              released_on={item.released_on}
            />
          ))}
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default Movies;
