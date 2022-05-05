import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ButtonConfig from '../componentes/ButtonConfig';
import FormLogin from '../componentes/FormLogin';

export default class Login extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <FormLogin history={ history } />
        <ButtonConfig />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(PropTypes.any).isRequired,
};
