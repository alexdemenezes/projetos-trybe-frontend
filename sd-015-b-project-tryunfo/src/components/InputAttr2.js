import React from 'react';
import PropTypes from 'prop-types';

class InputAttr2 extends React.Component {
  render() {
    const { cardAttr2, onInputChange } = this.props;
    return (
      <label htmlFor="attr2-input">
        Att02
        <input
          type="number"
          id="attr2-input"
          data-testid="attr2-input"
          name="attr2"
          value={ cardAttr2 }
          onChange={ onInputChange }
          required="true"
          min="0"
          max="90"
        />
      </label>
    );
  }
}

InputAttr2.propTypes = {
  cardAttr2: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default InputAttr2;
