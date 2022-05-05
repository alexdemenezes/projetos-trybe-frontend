import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumList extends React.Component {
  render() {
    const { albums } = this.props;
    return (
      <div>
        {albums.map((album) => {
          const {
            artworkUrl100,
            artistName,
            collectionId,
            collectionName,
          } = album;

          return (
            <Link
              to={ `/album/${collectionId}` }
              key={ collectionId }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <div
                id="album-card"
              >
                <img src={ artworkUrl100 } alt={ artistName } />
                <h3>{ collectionName }</h3>
                <h4>{ artistName }</h4>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

AlbumList.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AlbumList;
