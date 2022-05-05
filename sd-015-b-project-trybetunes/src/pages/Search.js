import React from 'react';
// import Albums from './Album';
import AlbumsList from '../Components/AlbumsList';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonSearchDisabled: true,
      inputArtist: '',
      albums: '',
      artist: '',
      albumResult: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.isValidInputArtist = this.isValidInputArtist.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.messageOrResult = this.messageOrResult.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({
      inputArtist: value,
      artist: value,
    }, () => this.isValidInputArtist());
  }

  handleSubmit() {
    this.setState({
      // inputArtist: '',
      isLoading: true,
    }, async () => {
      const { inputArtist } = this.state;
      const albunsSearched = await searchAlbumsAPI(inputArtist);
      const showNotFoundMessage = albunsSearched.length === 0;
      console.log(albunsSearched);

      this.setState({
        isLoading: false,
        albums: albunsSearched,
        message: showNotFoundMessage,
        inputArtist: '',
        albumResult: !showNotFoundMessage,
      });
    });
  }

  isValidInputArtist() {
    const minLength = 2;
    const { inputArtist } = this.state;
    const activeButton = inputArtist.length >= minLength;
    this.setState({
      isButtonSearchDisabled: !activeButton,
    });
  }

  messageOrResult() {
    const { message, artist, albumResult } = this.state;

    if (message) {
      return (
        <h1>Nenhum álbum foi encontrado</h1>
      );
    }
    if (albumResult) {
      return (
        <h1>
          {`Resultado de álbuns de: ${artist}`}
        </h1>
      );
    }
  }

  render() {
    const {
      isButtonSearchDisabled,
      isLoading,
      inputArtist,
      albumResult,
      albums } = this.state;

    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              id="search-artist-input"
              data-testid="search-artist-input"
              value={ inputArtist }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonSearchDisabled }
            onClick={ this.handleSubmit }
          >
            Pesquisar
          </button>
        </form>
        {isLoading && <h1>Caregando...</h1> }
        { this.messageOrResult() }
        {albumResult && <AlbumsList albums={ albums } />}
      </div>
    );
  }
}

export default Search;
