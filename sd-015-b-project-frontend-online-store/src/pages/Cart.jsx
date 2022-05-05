import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Loading from '../components/Loading';

export default class Cart extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      totalPrice: 0,
      cart: [],
    };
    this.sumAll = this.sumAll.bind(this);
    this.setStateCart = this.setStateCart.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.setStateCart();
  }

  setStateCart() {
    const { cart } = this.props;
    this.setState({
      cart,
    });
  }

  sumAll(increase, decrease) {
    if (increase) {
      this.setState((prevState) => ({
        totalPrice: prevState.totalPrice + increase,
      }));
    } else if (decrease) {
      this.setState((prevState) => ({
        totalPrice: prevState.totalPrice - decrease,
      }));
    }
  }

  deleteItem(itemId) {
    const { cart } = this.state;
    const cartWithoutItem = cart.filter((item) => item.id !== itemId);
    this.setState({
      cart: cartWithoutItem,
    });
  }

  render() {
    const { isLoading, totalPrice, cart } = this.state;
    // const { cart } = this.props;
    return (
      <div>
        {cart.length === 0
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : cart.map((item) => (
            <CartItem
              { ...item }
              key={ item.id }
              sumAll={ this.sumAll }
              deleteItemFromArray={ this.deleteItem }
            />))}
        {isLoading && <Loading />}
        <h2>
          Valor Total:
          {' '}
          {`R$ ${totalPrice.toFixed(2)}`}
        </h2>
        <Link to="/checkout" data-testid="checkout-products">
          Ir para Checkout
        </Link>
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
};
