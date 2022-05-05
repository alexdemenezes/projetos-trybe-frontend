import React from 'react';
import Proptypes from 'prop-types';

class MethodInput
  extends React.Component {
  render() {
    const { handleChange, method } = this.props;
    return (
      <label htmlFor="method-input">
        Metodo de pagamento:
        <select
          data-testid="method-input"
          id="method-input"
          name="method"
          onChange={ handleChange }
          method={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

MethodInput.propTypes = {
  handleChange: Proptypes.func.isRequired,
  method: Proptypes.string.isRequired,
};

export default MethodInput;
