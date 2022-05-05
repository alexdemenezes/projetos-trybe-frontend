import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

const minLengthOfLoginName = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonLoginDisabled: true,
      name: '',
      loading: false,
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.isValidName = this.isValidName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      name: target.value,
    }, () => this.isValidName());
  }

  handleSubmit() {
    const { name } = this.state;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        loading: false,
        shouldRedirect: true,
      });
    });
  }

  isValidName() {
    const { name } = this.state;
    const validName = name.length >= minLengthOfLoginName;
    this.setState({
      isButtonLoginDisabled: !validName,
    });
  }

  render() {
    const { isButtonLoginDisabled, name, loading, shouldRedirect } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    } if (shouldRedirect) {
      return (
        <Redirect to="/search" />
      );
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="userName">
            <input
              type="text"
              id="userName"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isButtonLoginDisabled } // desabilitado sim!
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
