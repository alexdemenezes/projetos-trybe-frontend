import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumInfo: '',
      songs: [],
      foundAlbum: false,
    };
    this.requestApi = this.requestApi.bind(this);
    this.albumInfo = this.albumInfo.bind(this);
    this.musicCards = this.musicCards.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.requestApi(id);
  }

  async requestApi(id) {
    const result = await getMusics(id);
    const found = result.length > 0;
    const arraySongs = result.slice(1);
    this.setState({
      albumInfo: result[0],
      songs: [...arraySongs],
      foundAlbum: found,
    });
  }

  albumInfo() {
    const { albumInfo } = this.state;
    const { artistName, collectionName, artworkUrl100 } = albumInfo;
    return (
      <section>
        <img src={ artworkUrl100 } alt="Album" />
        <h1 data-testid="album-name">{collectionName}</h1>
        <h2 data-testid="artist-name">{artistName}</h2>
      </section>
    );
  }

  musicCards() {
    const { songs } = this.state;
    return (
      songs.map((song) => (
        <section key={ song.trackId }>
          <MusicCard
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            trackId={ song.trackId }
            objSong={ song }
            useUpdateList={ false }
          />
        </section>
      ))
    );
  }

  render() {
    const { foundAlbum } = this.state;
    return (
      <div data-testid="page-album">
        {foundAlbum ? this.albumInfo() : <Loading />}
        {foundAlbum ? this.musicCards() : <Loading />}
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,

};

export default Album;
