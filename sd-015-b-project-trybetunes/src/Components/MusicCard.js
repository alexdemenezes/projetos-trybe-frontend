import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSong: false,
      loading: false,
    };
    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.requestFavoritsSongs = this.requestFavoritsSongs.bind(this);
    this.whatShowOnScreen = this.whatShowOnScreen.bind(this);
    this.removeFavoriteSong = this.removeFavoriteSong.bind(this);
  }

  componentDidMount() {
    this.requestFavoritsSongs();
  }

  async requestFavoritsSongs() {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    const arrayOfFavoritesSongs = await getFavoriteSongs();
    const isFavorite = arrayOfFavoritesSongs
      .filter((song) => (song.trackId === trackId)).length > 0;
    this.setState({
      loading: false,
      favoriteSong: isFavorite,
    });
  }

  addFavoriteSong() {
    this.setState({
      loading: true,
    }, async () => {
      const { objSong } = this.props;
      await addSong(objSong);
      this.setState({
        loading: false,
        favoriteSong: true,
      });
    });
  }

  removeFavoriteSong() {
    const { useUpdateList } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const { objSong } = this.props;
      await removeSong(objSong);
      this.setState({
        loading: false,
        favoriteSong: false,
      });
    });
    if (useUpdateList) {
      const { updateList } = this.props;
      updateList();
    }
  }

  whatShowOnScreen() {
    const { loading } = this.state;
    if (loading) {
      return (
        <section>
          {loading && <Loading />}
        </section>
      );
    }
    const { previewUrl, trackName, trackId } = this.props;
    const { favoriteSong } = this.state;
    return (
      <section>
        <section>
          { trackName }
        </section>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div>
          <label htmlFor="checkbox-music">
            Favorita
            <input
              type="checkbox"
              id="checkbox-music"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ favoriteSong }
              onChange={ favoriteSong ? this.removeFavoriteSong : this.addFavoriteSong }
            />
          </label>
        </div>
      </section>
    );
  }

  render() {
    return (
      <>
        {this.whatShowOnScreen()}
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  objSong: PropTypes.objectOf(PropTypes.any).isRequired,
  useUpdateList: PropTypes.bool.isRequired,
  updateList: PropTypes.func.isRequired,
};

export default MusicCard;
