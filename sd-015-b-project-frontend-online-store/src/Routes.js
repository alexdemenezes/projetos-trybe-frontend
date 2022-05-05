import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';

export default class Routes extends Component {
  constructor() {
    super();

    this.state = {
      cart: [],
    };
  }

  addToCart = (event) => {
    const { id, name } = event.target;
    this.setState((prevState) => {
      const hasPreviousItem = prevState.cart.some((item) => item.id === id);
      if (hasPreviousItem) {
        const objRepetido = prevState.cart.find((item) => item.id === id);
        const newCart = prevState.cart.filter((item) => item.id !== id);
        return ({
          cart: [...newCart, {
            id,
            name,
            quantity: objRepetido.quantity + 1,
          }],
        });
      }
      return ({
        cart: [...prevState.cart, {
          id,
          name,
          quantity: 1,
        }],
      });
    });
  }

  render() {
    const { cart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home addToCart={ this.addToCart } />
          </Route>
          <Route
            path="/carrinho"
            render={ (props) => (<Cart
              { ...props }
              cart={ cart }
            />) }
          />
          <Route
            path="/productDetails/:categoryId/:productId"
            render={ (propsRouter) => (
              <ProductDetails
                { ...propsRouter }
                addToCart={ this.addToCart }
              />) }
          />
          <Route path="/checkout" component={ Checkout } />
        </Switch>
      </BrowserRouter>
    );
  }
}
