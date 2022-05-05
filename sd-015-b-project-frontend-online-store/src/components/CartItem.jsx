import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

export default class CartItem extends React.Component {
  constructor() {
    super();

    this.state = {
      product: [],
      quantity: 0,
      price: 0,
      sumPrice: 0,
      unmountCartItem: false,
      isDecreaseButtonDisbaled: false,
    };
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.cartItem = this.cartItem.bind(this);
  }

  componentDidMount() {
    const { id, name } = this.props;
    this.requestApi(name, id);
  }

    requestApi = async (category, id) => {
      const { quantity, sumAll } = this.props;
      const cartegoryItems = await api.getProductsFromCategoryAndQuery(category, '');
      const product = (cartegoryItems.results).filter((item) => item.id === id);
      this.setState({
        product: product[0],
        quantity,
        price: product[0].price,
        sumPrice: product[0].price * quantity,
      }, () => {
        const { sumPrice } = this.state;
        sumAll(sumPrice, '');
      });
    };

    deleteItem() {
      const { sumAll, deleteItemFromArray } = this.props;
      const { sumPrice, product } = this.state;
      sumAll('', sumPrice);
      deleteItemFromArray(product.id);
      this.setState({
        unmountCartItem: true,
      });
    }

    decreaseQuantity() {
      const { sumAll } = this.props;
      this.setState((prevState) => ({
        quantity: prevState.quantity === 0 ? 0 : prevState.quantity - 1,
        sumPrice: prevState.sumPrice - prevState.price,
      }), () => {
        const { sumPrice, price } = this.state;
        if (sumPrice === 0) {
          this.setState({
            isDecreaseButtonDisbaled: true,
          });
        }
        sumAll('', price);
      });
    }

    increaseQuantity() {
      const { sumAll } = this.props;
      this.setState((prevState) => ({
        quantity: prevState.quantity + 1,
        sumPrice: prevState.sumPrice + prevState.price,
        isDecreaseButtonDisbaled: false,
      }), () => {
        const { price } = this.state;
        sumAll(price, '');
      });
    }

    cartItem() {
      const { product, quantity, sumPrice, isDecreaseButtonDisbaled } = this.state;
      return (
        <section>
          <button
            type="button"
            onClick={ this.deleteItem }
          >
            X

          </button>
          <h1 data-testid="shopping-cart-product-name">{product.title}</h1>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ this.decreaseQuantity }
            disabled={ isDecreaseButtonDisbaled }
          >
            -
          </button>
          <p data-testid="shopping-cart-product-quantity">{quantity}</p>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ this.increaseQuantity }
          >
            +
          </button>
          <h5>{`R$ ${sumPrice.toFixed(2)}`}</h5>

        </section>
      );
    }

    render() {
      const { unmountCartItem } = this.state;
      return (
        <p>{unmountCartItem ? 'apaguei' : this.cartItem()}</p>
      );
    }
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  sumAll: PropTypes.func.isRequired,
  deleteItemFromArray: PropTypes.func.isRequired,
};
