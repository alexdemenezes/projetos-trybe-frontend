import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderGame from '../componentes/HeaderGame';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      FeedbackAssertions: '',
    };
    this.verifyPerformance = this.verifyPerformance.bind(this);
  }

  verifyPerformance() {
    const { assertions } = this.props;
    console.log(assertions);
    const NUM_THREE = 3;
    if (assertions < NUM_THREE) {
      return (
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
      );
    }
    if (assertions >= NUM_THREE) {
      return (
        <h1 data-testid="feedback-text">Mandou bem!</h1>
      );
    }
    return (
      <h1 data-testid="feedback-text">teste</h1>
    );
  }

  render() {
    const { score, assertions, history } = this.props;
    const { FeedbackAssertions } = this.state;
    return (
      <div>
        <HeaderGame />
        {this.verifyPerformance()}
        <h1
          data-testid="feedback-total-score"
        >
          {score}
        </h1>
        <h1
          data-testid="feedback-total-question"
        >
          { assertions.toString() || FeedbackAssertions }
        </h1>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.totalPoints.score,
  assertions: state.totalPoints.assertions.length,
});

export default connect(mapStateToProps)(Feedback);
