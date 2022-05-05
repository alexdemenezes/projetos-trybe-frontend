import React from 'react';
import PropTypes from 'prop-types';

class InputRare extends React.Component {
  render() {
    const { cardRare, onInputChange } = this.props;
    return (
      <label htmlFor="rare-input">
        Raridade
        <select
          type="select"
          id="rare-input"
          data-testid="rare-input"
          value={ cardRare }
          name="rare"
          onChange={ onInputChange }
          required="true"
        >
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
        </select>
      </label>
    );
  }
}

InputRare.propTypes = {
  cardRare: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default InputRare;
