import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="movie-card ">
        <img className='movie-card-image' src={ movie.imagePath } alt="" />
        <div className='movie-card-body'>
        <h4 className='movie-card-title'>{ movie.title }</h4>
        <h5 classnamee='movie-card-subtitle'>{ movie.subtitle }</h5>
        <p className='movie-card-storyline' >{ movie.storyline }</p>
        <section className="movie-card-rating">
          <div>
          <Rating rating={ movie.rating } />
          </div>
        </section>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape(
    {
      title: PropTypes.string,
      subtitle: PropTypes.string,
      storyline: PropTypes.string,
      rating: PropTypes.number,
      imagePath: PropTypes.string,
    },
  ).isRequired,
};

export default MovieCard;
