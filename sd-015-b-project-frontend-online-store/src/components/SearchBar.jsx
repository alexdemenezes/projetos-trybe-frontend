import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <>
        <label htmlFor="search-bar">
          <input
            type="text"
            name="searchBar"
            id="search-bar"
            data-testid="query-input"
            onChange={ handleChange }
          />
        </label>
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      </>
    );
  }
}

SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
