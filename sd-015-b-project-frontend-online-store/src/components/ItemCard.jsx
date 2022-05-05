import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ItemCard extends Component {
  render() {
    const { item } = this.props;
    return (
      <Link
        to={ `/productDetails/${item.category_id}/${item.id}` }
        data-testid="product-detail-link"
      >
        <div data-testid="product">
          <p>{ item.title }</p>
          <img src={ item.thumbnail } alt={ item.title } />
          <p>{item.price}</p>
        </div>
      </Link>
    );
  }
}

ItemCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};
