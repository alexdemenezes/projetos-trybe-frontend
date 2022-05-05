import React from 'react';
import Proptypes from 'prop-types';

class ValueInput extends React.Component {
  render() {
    const { handleChange, value } = this.props;
    return (
      <label htmlFor="value-input">
        Valor Despesa:
        <input
          type="text"
          data-testid="value-input"
          id="value-input"
          onChange={ handleChange }
          name="value"
          value={ value }
        />
      </label>
    );
  }
}

ValueInput.propTypes = {
  handleChange: Proptypes.func.isRequired,
  value: Proptypes.string.isRequired,
};
export default ValueInput;
