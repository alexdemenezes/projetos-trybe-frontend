import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
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

    } = this.props;

    return (
      <section id="complete-card">
        <div id="head-card">
          <h2 data-testid="name-card">{ cardName }</h2>
          <img
            src={ cardImage }
            alt={ cardName }
            data-testid="image-card"
          />
          {
            cardTrunfo ? <p data-testid="trunfo-card">Super Trunfo</p> : ''
          }
        </div>
        <div id="text-description">
          <p data-testid="description-card">{ cardDescription }</p>
        </div>
        <div id="bottom-card">
          <div id="attr1">
            <h4 data-testid="attr1-card">{ cardAttr1 }</h4>
          </div>
          <div id="attr2">
            <h4 data-testid="attr2-card">{ cardAttr2 }</h4>
          </div>
          <div id="attr3">
            <h4 data-testid="attr3-card">{ cardAttr3 }</h4>
          </div>
          <span data-testid="rare-card">{ cardRare }</span>
        </div>

      </section>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
