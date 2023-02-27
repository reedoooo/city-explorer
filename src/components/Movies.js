import React from "react";
import Movie from "./Movie";

class Movies extends React.Component {
  render() {
    return (
      <>
        <h2 className="mb-3">Movies:</h2>
        {this.props.movieResults.map((item, idx) => (
          <Movie
            key={idx}
            title={item.title}
            overvew={item.overvew}
            average_votes={item.average_votes}
            total_votes={item.total_votes}
            poster={item.posterImgPath}
            popularity={item.popularity}
            released_on={item.released_on}
          />
        ))}
        {console.log('movie working')}
      </>
    );
  }
}

export default Movies;
