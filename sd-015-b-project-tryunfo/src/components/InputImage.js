import React from 'react';
import PropTypes from 'prop-types';

class InputImage extends React.Component {
  render() {
    const { cardImage, onInputChange } = this.props;
    return (
      <label htmlFor="image-input">
        Imagem
        <input
          type="text"
          id="image-input"
          data-testid="image-input"
          value={ cardImage }
          name="image"
          onChange={ onInputChange }
          required="true"
        />
      </label>
    );
  }
}

InputImage.propTypes = {
  cardImage: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default InputImage;
