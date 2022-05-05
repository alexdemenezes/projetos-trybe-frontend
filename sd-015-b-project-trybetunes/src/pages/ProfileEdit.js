import React from 'react';
import { Redirect } from 'react-router';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      foundUser: false,
      name: '',
      email: '',
      image: '',
      description: '',
      isButtonSaveDisabled: true,
      shouldRedirect: false,
    };
    this.requestApi = this.requestApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isValidform = this.isValidform.bind(this);
    this.callUpdateUser = this.callUpdateUser.bind(this);
  }

  componentDidMount() {
    this.requestApi();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.isValidform());
  }

  isValidform() {
    const { name, email, image, description } = this.state;
    const isValid = (name.length > 0
    && email.length > 0
    && image.length > 0
    && description.length > 0);
    this.setState({
      isButtonSaveDisabled: !isValid,
    });
  }

  async callUpdateUser() {
    this.setState({
      loading: true,
    });

    const { name, email, image, description } = this.state;
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({
      loading: false,
    }, () => {
      this.setState({
        shouldRedirect: true,
      });
    });
  }

  requestApi() {
    this.setState({
      loading: true,
    }, async () => {
      const result = await getUser();
      const found = Object.keys(result).length > 0;
      const { name, email, image, description } = result;
      this.setState({
        loading: false,
        foundUser: found,
        name,
        email,
        image,
        description,
      }, () => this.isValidform());
    });
  }

  render() {
    const {
      loading,
      foundUser,
      name,
      email,
      image,
      description,
      isButtonSaveDisabled,
      shouldRedirect,
    } = this.state;

    if (shouldRedirect) {
      return (
        <Redirect to="/profile" />
      );
    } if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="page-profile-edit">
        {foundUser && (
          <form>
            <label htmlFor="input-name">
              <input
                type="text"
                id="input-name"
                name="name"
                data-testid="edit-input-name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-email">
              <input
                type="email"
                id="input-email"
                name="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="input-description">
              <input
                type="text"
                id="input-description"
                name="description"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-image">
              <input
                type="text"
                id="input-image"
                name="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              disabled={ isButtonSaveDisabled }
              onClick={ this.callUpdateUser }
              data-testid="edit-button-save"
            >
              Salvar
            </button>

          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
