import React, { Component } from 'react';

export default class Checkout extends Component {
  render() {
    return (
      <form>
        <fieldset>
          <section>
            <h4>Revise seus Produtos</h4>
          </section>
        </fieldset>

        <fieldset>
          <label htmlFor="name">
            <input
              data-testid="checkout-fullname"
              type="text"
              placeholder="Nome Completo"
              required
            />
          </label>
          <label htmlFor="email">
            <input
              data-testid="checkout-email"
              type="email"
              placeholder="Email"
              required="required"
            />
          </label>
          <label htmlFor="cpf">
            <input
              data-testid="checkout-cpf"
              type="text"
              placeholder="CPF"
              required
            />
          </label>
          <label htmlFor="telefone">
            <input
              data-testid="checkout-phone"
              type="tel"
              placeholder="Telefone"
              required
            />
          </label>
          <label htmlFor="cep">
            <input
              data-testid="checkout-cep"
              type="text"
              placeholder="CEP"
              required
            />
          </label>
          <label htmlFor="endereco">
            <input
              data-testid="checkout-address"
              type="text"
              placeholder="Endereço"
              required
            />
          </label>
          <label htmlFor="complemento">
            <input
              data-testid=""
              type="text"
              placeholder="Complemento"
              required
            />
          </label>
          <label htmlFor="numero">
            <input
              data-testid=""
              type="number"
              placeholder="Número"
              required
            />
          </label>
          <label htmlFor="cidade">
            <input
              data-testid=""
              type="text"
              placeholder="Cidade"
              required
            />
          </label>
          <label htmlFor="estado">
            <input
              data-testid=""
              type="text"
              placeholder="Estado"
              required
            />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="payment-method">
            Metodo de pagamento:
            <input type="radio" name="payment-method" />
            <input type="radio" name="payment-method" />
            <input type="radio" name="payment-method" />
            <input type="radio" name="payment-method" />
          </label>
        </fieldset>

        <button type="button">Comprar</button>
      </form>
    );
  }
}
