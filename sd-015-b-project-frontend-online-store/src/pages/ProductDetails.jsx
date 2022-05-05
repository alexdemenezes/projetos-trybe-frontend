import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import Loading from '../components/Loading';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      isLoading: false,
      evals: [],
      currentEval: {},
    };
    this.requestApi = this.requestApi.bind(this);
    this.mountProductDetails = this.mountProductDetails.bind(this);
  }

  componentDidMount() {
    this.requestApi();
    this.getEvals();
  }

  getEvals() {
    const prevEvalsString = localStorage.getItem('evaluations');
    if (prevEvalsString) {
      const prevEvals = JSON.parse(prevEvalsString);
      this.setState({
        evals: prevEvals,
      });
    }
  }

  showPreviousEvals = () => {
    const { evals } = this.state;
    return evals.map((evaluation, index) => (
      <div key={ index } style={ { display: 'flex' } }>
        <p style={ { display: 'flex', marginLeft: '2rem' } }>{evaluation.email}</p>
        <p style={ { display: 'flex', marginLeft: '2rem' } }>{evaluation.rate}</p>
        <p style={ { display: 'flex', marginLeft: '2rem' } }>{evaluation.description}</p>
      </div>
    ));
  }

  handleSubmitButtonClick = (event) => {
    event.preventDefault();
    const { evals, currentEval } = this.state;
    evals.push(currentEval);
    localStorage.setItem('evaluations', JSON.stringify(evals));
    this.setState({
      currentEval: {
        name: '',
        rate: 1,
        description: '',
      },
    });
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState((prevState) => ({
      currentEval: {
        ...prevState.currentEval,
        [name]: value,
      },
    }));
  }

  requestApi() {
    this.setState({
      isLoading: true,
    }, async () => {
      const { match: { params: { categoryId, productId } } } = this.props;
      const categoryProduct = await api.getProductsFromCategoryAndQuery(categoryId, '');
      const product = (categoryProduct.results).filter((item) => item.id === productId);
      this.setState({
        product: product[0],
        isLoading: false,
      });
    });
  }

  mountProductDetails() {
    const { product, evals } = this.state;
    const { match: { params: { categoryId, productId } }, addToCart } = this.props;
    return (
      <section>
        <section>
          <h1>Detalhes aqui</h1>
          <h3 data-testid="product-detail-name">{product.title }</h3>
          <img src={ product.thumbnail } alt={ product.title } />
          <h5>{product.price}</h5>
          <h4>Especificações tecnicas:</h4>
        </section>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          id={ productId }
          name={ categoryId }
          onClick={ addToCart }
        >
          Comprar
        </button>
        <Link
          data-testid="shopping-cart-button"
          to="/carrinho"
        >
          Carrinho
        </Link>
        {this.renderForm()}
        {evals.length > 0 && this.showPreviousEvals(evals)}
      </section>
    );
  }

  renderForm() {
    const { currentEval: { email, rate, description } } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="aval">
            Nota:
            <input
              type="number"
              name="rate"
              id="aval"
              value={ rate }
              min="1"
              max="5"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="product-detail-evaluation"
              type="textarea"
              name="description"
              id="description"
              value={ description }
              maxLength="200"
              onChange={ this.handleInputChange }
            />
          </label>
          <button type="submit" onClick={ this.handleSubmitButtonClick }>Enviar</button>
        </form>
      </section>);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>{isLoading ? <Loading /> : this.mountProductDetails()}</div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
