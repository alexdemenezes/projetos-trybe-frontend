import React from 'react';
import PropTypes from 'prop-types';

class CheckboxTrunfo extends React.Component {
  render() {
    const { cardTrunfo, onInputChange, hasTrunfo } = this.props;

    if (hasTrunfo) {
      return (
        <span>Você já tem um Super Trunfo em seu baralho</span>
      );
    }
    return (
      <label htmlFor="trunfo-input">
        Super Trybe Triunfo
        <input
          type="checkbox"
          id="trunfo-input"
          data-testid="trunfo-input"
          checked={ cardTrunfo }
          name="cardTrunfo"
          onChange={ onInputChange }
          // disabled={ hasTrunfo }
        />
      </label>
    );
  }
}

CheckboxTrunfo.propTypes = {
  cardTrunfo: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
};

export default CheckboxTrunfo;
