import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class CardList extends React.Component {
  render() {
    const { cards, deleteCard } = this.props;
    return (
      <div>
        {cards.map((objCard, objIndex) => {
          const {
            name,
            description,
            attr1,
            attr2,
            attr3,
            image,
            rare,
            cardTrunfo,
          } = objCard;
          return (
            <div key={ objIndex }>
              <Card
                cardName={ name }
                cardDescription={ description }
                cardAttr1={ attr1 }
                cardAttr2={ attr2 }
                cardAttr3={ attr3 }
                cardImage={ image }
                cardRare={ rare }
                cardTrunfo={ cardTrunfo }
              />
              <button
                data-testid="delete-button"
                type="button"
                objIndex={ objIndex }
                onClick={ deleteCard }
              >
                Apagar
              </button>
            </div>
          );
        })}
      </div>

    );
  }
}

CardList.propTypes = {
  cards: PropTypes.shape({
    map: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    attr1: PropTypes.string.isRequired,
    attr2: PropTypes.string.isRequired,
    attr3: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rare: PropTypes.string.isRequired,
    cardTrunfo: PropTypes.bool.isRequired,
  }),
  deleteCard: PropTypes.func.isRequired,
};

CardList.defaultProps = {
  cards: null,
};

export default CardList;
