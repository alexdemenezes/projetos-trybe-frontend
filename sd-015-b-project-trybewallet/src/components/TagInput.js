import React from 'react';
import Proptypes from 'prop-types';

class TagInput extends React.Component {
  render() {
    const { handleChange, tag } = this.props;
    return (
      <label htmlFor="tag-input">
        <select
          name="tag"
          data-testid="tag-input"
          id="tag-input"
          onChange={ handleChange }
          value={ tag }
        >
          <option id="alimentação">Alimentação</option>
          <option id="lazer">Lazer</option>
          <option id="trabalho">Trabalho</option>
          <option id="transporte">Transporte</option>
          <option id="saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

TagInput.propTypes = {
  handleChange: Proptypes.func.isRequired,
  tag: Proptypes.string.isRequired,
};

export default TagInput;
