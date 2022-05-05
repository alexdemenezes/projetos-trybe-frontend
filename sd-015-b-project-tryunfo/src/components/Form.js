import React from 'react';
import PropTypes from 'prop-types';
import InputDescription from './InputDescription';
import InputName from './InputName';
import InputAttr1 from './InputAttr1';
import InputAttr2 from './InputAttr2';
import InputAttr3 from './InputAttr3';
import InputImage from './InputImage';
import InputRare from './InputRare';
import CheckboxTrunfo from './CheckboxTrunfo';
import ButtonSave from './ButtonSave';

class Form extends React.Component {
  render() {
    const {

      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,

    } = this.props;

    return (
      <form>
        <InputName
          cardName={ cardName }
          onInputChange={ onInputChange }
        />
        <InputDescription
          cardDescription={ cardDescription }
          onInputChange={ onInputChange }
        />
        <InputAttr1
          cardAttr1={ cardAttr1 }
          onInputChange={ onInputChange }
        />
        <InputAttr2
          cardAttr2={ cardAttr2 }
          onInputChange={ onInputChange }
        />
        <InputAttr3
          cardAttr3={ cardAttr3 }
          onInputChange={ onInputChange }
        />
        <InputImage
          cardImage={ cardImage }
          onInputChange={ onInputChange }
        />
        <InputRare
          cardRare={ cardRare }
          onInputChange={ onInputChange }
        />
        <CheckboxTrunfo
          cardTrunfo={ cardTrunfo }
          onInputChange={ onInputChange }
          hasTrunfo={ hasTrunfo }
        />
        <ButtonSave
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ onSaveButtonClick }
        />
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};
