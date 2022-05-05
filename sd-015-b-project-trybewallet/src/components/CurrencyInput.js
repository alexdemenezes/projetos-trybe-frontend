import React from 'react';
import Proptypes from 'prop-types';
import getCurrentValueCoins from '../services/requestApiCoins';

class CurrencyInput extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: {},
    };
    this.requestApi = this.requestApi.bind(this);
  }

  componentDidMount() {
    this.requestApi();
  }

  requestApi() {
    getCurrentValueCoins()
      .then((response) => {
        delete response.USDT;
        this.setState({
          currencies: response,
        });
      });
  }

  render() {
    const { handleChange, currencyState } = this.props;
    const { currencies } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda
        <select
          name="currency"
          data-testid="currency-input"
          id="currency-input"
          onChange={ handleChange }
          value={ currencyState }
        >
          {' '}
          {Object.keys(currencies).map((currency) => (
            <option
              key={ currency }
              value={ currency }
              datatestid={ currency }
            >
              {currency}
            </option>
          ))}

        </select>
      </label>
    );
  }
}

CurrencyInput.propTypes = {
  handleChange: Proptypes.func.isRequired,
  currencyState: Proptypes.string.isRequired,
};

export default CurrencyInput;
