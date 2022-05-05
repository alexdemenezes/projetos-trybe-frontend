import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';

export default class ProductList extends Component {
  render() {
    const { list, addToCart } = this.props;
    return (
      <div>
        {list.map((item) => (
          <div key={ item.id }>
            <ItemCard
              item={ item }
              addToCart={ this.addToCart }
            />
            <button
              type="button"
              name={ item.category_id }
              id={ item.id }
              onClick={ addToCart }
              data-testid="product-add-to-cart"
            >
              cart
            </button>
          </div>
        )) }
      </div>
    );
  }
}

ProductList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  addToCart: PropTypes.func.isRequired,
};
