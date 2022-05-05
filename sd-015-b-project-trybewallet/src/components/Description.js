import React from 'react';
import Proptypes from 'prop-types';

class Description extends React.Component {
  render() {
    const { handleChange, description } = this.props;
    return (
      <label
        htmlFor="description-input"
      >
        Decrição
        <textarea
          data-testid="description-input"
          name="description"
          onChange={ handleChange }
          value={ description }
        />
      </label>
    );
  }
}
Description.propTypes = {
  handleChange: Proptypes.func.isRequired,
  description: Proptypes.string.isRequired,
};

export default Description;
