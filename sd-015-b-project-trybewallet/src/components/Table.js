import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  constructor() {
    super();
    this.getExpenses = this.getExpenses.bind(this);
  }

  getExpenses() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <>
        {expenses
          .map(({ description, tag, method, value, currency, exchangeRates, id }) => (
            <tr className="expense" key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>
                {exchangeRates[currency].name.split('/')[0]}
              </td>
              <td>
                {`${Number(exchangeRates[currency].ask).toFixed(2)}`}
              </td>
              <td>
                {`${(Number(value) * Number(exchangeRates[currency].ask))
                  .toFixed(2)}`}
              </td>
              <td>
                Real
              </td>
            </tr>
          ))}
      </>
    );
  }

  render() {
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {this.getExpenses()}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(Table);
