import React from 'react';
import PropTypes from 'prop-types';

class InputDescription extends React.Component {
  render() {
    const { cardDescription, onInputChange } = this.props;
    return (
      <label htmlFor="description-input">
        Descrição
        <input
          type="text-area"
          id="description-input"
          data-testid="description-input"
          value={ cardDescription }
          name="description"
          onChange={ onInputChange }
          required="true"
        />
      </label>
    );
  }
}

InputDescription.propTypes = {
  cardDescription: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default InputDescription;
