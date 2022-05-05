import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginThunk } from '../actions';

const MIN_CHAR_PASSWORD = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonLoginDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
  }

  verifyInputs() {
    const INDEX_RESULT = -1;
    const { email, password } = this.state;
    const isEmailValid = email.indexOf('@') !== INDEX_RESULT && email
      .indexOf('.com') !== INDEX_RESULT;
    const isPasswordValid = password.length >= MIN_CHAR_PASSWORD;
    const validForm = isEmailValid && isPasswordValid;
    this.setState({
      isButtonLoginDisabled: !validForm,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.verifyInputs());
  }

  handleClick() {
    const { loginDispatch, history } = this.props;
    const { email } = this.state;
    loginDispatch({
      email,
    });
    history.push('/carteira');
  }

  render() {
    const { email, password, isButtonLoginDisabled } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="email-input">
            Email
            <input
              type="email"
              data-testid="email-input"
              id="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="password-input">
            Senha
            <input
              type="password"
              name="password"
              value={ password }
              data-testid="password-input"
              id="password-input"
              onChange={ this.handleChange }
              required
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
            disabled={ isButtonLoginDisabled }
          >
            Entrar
          </button>

        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (payload) => dispatch(loginThunk(payload)),
});

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
