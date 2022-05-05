import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CurrencyInput from './CurrencyInput';
import ValueInput from './ValueInput';
import MethodInput from './MethodInput';
import TagInput from './TagInput';
import Description from './Description';
import { updateExpenseActionThunk } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const { expense } = this.state;

    if (name === 'method') {
      this.setState({
        expense: {
          ...expense,
          method: value,
        },
      });
    } else {
      this.setState({
        expense: {
          ...expense,
          [name]: value,
        },
      });
    }
  }

  addExpense() {
    const { sendExpense } = this.props;
    const { expense } = this.state;
    sendExpense(expense);
    this.setState({
      expense: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    });
  }

  render() {
    const {
      expense: {
        value,
        description,
        currency,
        method,
        tag,
      },

    } = this.state;
    return (
      <section>
        <form>
          <ValueInput handleChange={ this.handleChange } value={ value } />
          <Description handleChange={ this.handleChange } description={ description } />
          <CurrencyInput handleChange={ this.handleChange } currencyState={ currency } />
          <MethodInput handleChange={ this.handleChange } method={ method } />
          <TagInput handleChange={ this.handleChange } tag={ tag } />
          <button
            type="button"
            onClick={ this.addExpense }
          >
            Adicionar despesa

          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendExpense: (payload) => dispatch(updateExpenseActionThunk(payload)),
});

Form.propTypes = {
  sendExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Form);
