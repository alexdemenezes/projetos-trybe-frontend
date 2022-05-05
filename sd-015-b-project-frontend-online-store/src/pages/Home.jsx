import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/SideBar';
import ProductList from '../components/ProductList';
import * as api from '../services/api';
import Loading from '../components/Loading';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: '',
      products: [],
      isLoading: false,
    };
  }

  handleSearchBar = async ({ target: { value } }) => {
    this.setState({
      searchValue: value,
    });
  }

  handleChangeSideBar = ({ target: { id } }) => {
    this.setState({
      isLoading: true,
    }, async () => {
      const productsList = await api.getProductsFromCategoryAndQuery(id, '');
      this.setState({
        products: productsList.results,
        isLoading: false,
      });
    });
  }

  handleSearchButton = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { searchValue } = this.state;
      const productsList = await api.getProductsFromCategoryAndQuery('', searchValue);
      this.setState({
        products: productsList.results,
        isLoading: false,
      });
    });
  }

  render() {
    const { products, isLoading } = this.state;
    const { addToCart } = this.props;
    return (
      <>
        <SearchBar handleChange={ this.handleSearchBar } />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleSearchButton }
        >
          Procurar
        </button>
        <Sidebar handleChange={ this.handleChangeSideBar } />
        <Link
          data-testid="shopping-cart-button"
          to="/carrinho"
        >
          Carrinho
        </Link>
        {isLoading ? <Loading />
          : <ProductList list={ products } addToCart={ addToCart } />}
      </>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
