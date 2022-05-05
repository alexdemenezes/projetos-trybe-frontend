import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
      loading: false,
      foundFavoritesSongs: false,
    };
    this.requestFavoritesSongs = this.requestFavoritesSongs.bind(this);
  }

  componentDidMount() {
    this.requestFavoritesSongs();
  }

  requestFavoritesSongs() {
    this.setState({
      loading: true,
    }, async () => {
      const resultApi = await getFavoriteSongs();
      const found = resultApi.length > 0;
      this.setState({
        loading: false,
        favoritesSongs: [...resultApi],
        foundFavoritesSongs: found,
      });
    });
  }

  render() {
    const { loading, favoritesSongs, foundFavoritesSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        {loading && <Loading />}
        {foundFavoritesSongs && favoritesSongs.map((song) => (
          <section key={ song.trackId }>
            <MusicCard
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              objSong={ song }
              updateList={ this.requestFavoritesSongs }
              useUpdateList={ foundFavoritesSongs } // usando isso pois n posso passar o true direto
            />
          </section>
        )) }

      </div>
    );
  }
}

export default Favorites;
