import React from 'react';
import PropTypes from 'prop-types';

class InputAttr3 extends React.Component {
  render() {
    const { cardAttr3, onInputChange } = this.props;
    return (
      <label htmlFor="attr3-input">
        Att03
        <input
          type="number"
          id="attr3-input"
          data-testid="attr3-input"
          value={ cardAttr3 }
          name="attr3"
          onChange={ onInputChange }
          required="true"
          min="0"
          max="90"
        />
      </label>
    );
  }
}

InputAttr3.propTypes = {
  cardAttr3: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default InputAttr3;
