import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderGame from '../componentes/HeaderGame';
import requestQuestionThunk from '../redux/action/thunk';
import Questions from '../componentes/Questions';

class Game extends Component {
  async componentDidMount() {
    const { requestApiThunk } = this.props;
    const TOKEN = localStorage.getItem('token');
    requestApiThunk(TOKEN);
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <HeaderGame />
        <Questions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  requestApiThunk: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestApiThunk: (TOKEN) => {
    dispatch(requestQuestionThunk(TOKEN));
  },
});

export default connect(null, mapDispatchToProps)(Game);
