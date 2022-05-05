import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailAction, nameAction } from '../redux/action';
import { getRequestTokenAPI } from '../services/Api';

class FormLogin extends Component {
  constructor() {
    super();

    this.state = {
      isButtonLoginDisable: true,
      nome: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  verifyInput() {
    const { nome, email } = this.state;
    const isInputName = nome.length > 0;
    const isInputEmail = email.length > 0;
    const IsValidForm = isInputName && isInputEmail;
    this.setState({
      isButtonLoginDisable: !IsValidForm,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.verifyInput());
  }
  // player: {
  //   name,
  //   assertions,
  //   score,
  //   gravatarEmail
  // }

  async handleClick(event) {
    event.preventDefault();
    const { history, setEmail, setName } = this.props;
    const { email, nome } = this.state;
    const TOKEN = await getRequestTokenAPI();
    localStorage.setItem('state', JSON.stringify({ player: {
      name: nome,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    } }));
    localStorage.setItem('token', TOKEN);
    setEmail(email);
    setName(nome);
    history.push('/game');
  }

  render() {
    const { isButtonLoginDisable } = this.state;
    return (
      <form>
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            id="input-player-name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            name="nome"
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="email"
            id="input-gravatar-email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            name="email"
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isButtonLoginDisable }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </form>
    );
  }
}

FormLogin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setEmail: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(emailAction(email)),
  setName: (nome) => dispatch(nameAction(nome)),
});

export default connect(null, mapDispatchToProps)(FormLogin);
