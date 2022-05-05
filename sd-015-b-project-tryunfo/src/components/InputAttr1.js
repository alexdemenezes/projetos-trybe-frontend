import React from 'react';
import PropTypes from 'prop-types';

class InputAttr1 extends React.Component {
  render() {
    const { cardAttr1, onInputChange } = this.props;
    return (
      <label htmlFor="attr1-input">
        Att01
        <input
          type="number"
          id="attr1-input"
          data-testid="attr1-input"
          value={ cardAttr1 }
          name="attr1"
          onChange={ onInputChange }
          required="true"
          min="0"
          max="90"
        />
      </label>
    );
  }
}

InputAttr1.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default InputAttr1;
