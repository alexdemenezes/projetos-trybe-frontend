import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  generateHash() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    return gravatar;
  }

  render() {
    const { email, nome, score } = this.props;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.generateHash() }
          alt="imagem de perfil"
        />
        <p data-testid="header-player-name">{`nome: ${nome}`}</p>
        <p data-testid="header-score">{score}</p>
        <p>{`email: ${email}`}</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  nome: state.login.nome,
  score: state.totalPoints.score,
});

export default connect(mapStateToProps)(Header);
