import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      totalExpenses: 0,
    };
    this.sumAll = this.sumAll.bind(this);
  }

  componentDidMount() {
    this.sumAll();
  }

  componentDidUpdate(prevProps) {
    const { expense } = this.props;

    if (prevProps.expense !== expense) {
      this.sumAll();
    }
  }

  sumAll() {
    const { expense } = this.props;
    const values = expense.map((item) => Number(item.value));
    const currencyQuote = expense.map((item) => Number(
      item.exchangeRates[item.currency].ask,
    ));
    let total = 0;
    for (let i = 0; i < currencyQuote.length; i += 1) {
      total += (values[i] * currencyQuote[i]);
    }

    this.setState({
      totalExpenses: total.toFixed(2),
    });
  }

  render() {
    const { email } = this.props;
    const { totalExpenses } = this.state;
    return (
      <header>
        <h3
          data-testid="email-field"
        >
          {email}
        </h3>
        <h3
          data-testid="total-field"
        >
          { totalExpenses }
        </h3>
        <h3
          data-testid="header-currency-field"
        >
          BRL
        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expense: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
