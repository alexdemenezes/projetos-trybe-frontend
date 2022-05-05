import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import CardList from './components/CardList';

class App extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.verifyValidationSteps = this.verifyValidationSteps.bind(this);
    this.functionSaveCard = this.functionSaveCard.bind(this);
    this.cleanForm = this.cleanForm.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    this.state = {
      name: '',
      description: '',
      attr1: '0',
      attr2: '0',
      attr3: '0',
      image: '',
      rare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      saveCards: [],
      hasTrunfo: false,

    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        isSaveButtonDisabled: this.verifyValidationSteps(),
      });
    });
  }

  verifyValidationSteps() {
    const {
      name,
      description,
      attr1,
      attr2,
      attr3,
      image,
      rare,
    } = this.state;
    const maxNumber = 210;
    const maxAtrr = 90;
    const validationStep1 = name && description && image && rare;
    const validationStep2 = Number(attr1) + Number(attr2) + Number(attr3) <= maxNumber;
    const validationStep3 = (
      Number(attr1) <= maxAtrr && Number(attr1) >= 0
      && Number(attr2) <= maxAtrr && Number(attr2) >= 0
      && Number(attr3) <= maxAtrr && Number(attr3) >= 0
    );

    return !(validationStep1 && validationStep2 && validationStep3);
  }

  functionSaveCard(event) {
    event.preventDefault();
    const {
      name,
      description,
      attr1,
      attr2,
      attr3,
      image,
      rare,
      cardTrunfo,
      saveCards,

    } = this.state;

    const newCard = {
      name,
      description,
      attr1,
      attr2,
      attr3,
      image,
      rare,
      cardTrunfo,

    };
    this.setState({
      hasTrunfo: cardTrunfo,
      saveCards: [].concat(saveCards, newCard),
    }, this.cleanForm);
  }

  cleanForm() {
    this.setState({
      name: '',
      description: '',
      attr1: '0',
      attr2: '0',
      attr3: '0',
      image: '',
      rare: 'normal',

    });
  }

  deleteCard({ target }) {
    const { objIndex } = target;
    const { saveCards } = this.state;

    saveCards.splice(objIndex, 1);

    const saveCardStillHaveTrunfo = saveCards
      .find((objCard) => {
        if (objCard.cardTrunfo === true) {
          return true;
        }
        return false;
      });

    if (saveCardStillHaveTrunfo) {
      this.setState({
        saveCards,
      });
    }

    this.setState({
      cardTrunfo: false,
      hasTrunfo: false,
      saveCards,
    });
  }

  render() {
    const {
      name,
      description,
      attr1,
      attr2,
      attr3,
      image,
      rare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      saveCards,
    } = this.state;

    return (
      <div>
        <Form
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ image }
          cardRare={ rare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.functionSaveCard }

        />
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
        <CardList
          cards={ saveCards }
          deleteCard={ this.deleteCard }
        />
      </div>
    );
  }
}

export default App;
