import React from 'react';
import PropTypes from 'prop-types';

class InputName extends React.Component {
  render() {
    const { cardName, onInputChange } = this.props;

    const required = true;

    return (
      <label htmlFor="name-input">
        Nome
        <input
          type="text"
          id="name-input"
          data-testid="name-input"
          value={ cardName }
          name="name"
          onChange={ onInputChange }
          required={ required }

        />
      </label>
    );
  }
}

InputName.propTypes = {
  cardName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default InputName;
