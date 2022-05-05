import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOfFour, arrayOfTwo, updateLocalStorage, renderButton } from '../helpers';
import { getAssertion } from '../redux/action';
import finalPoints from '../services/Score';

const ONE_SECOND = 1000;
const MIN_TIME_LIMIT = 1;
let completeAnswers = [];
class Questions extends Component {
  constructor() {
    super();

    this.randomArrayOfAnswers = this.randomArrayOfAnswers.bind(this);
    this.handleOptionsClick = this.handleOptionsClick.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.nextQuestionClick = this.nextQuestionClick.bind(this);
    this.verifyTimeLimit = this.verifyTimeLimit.bind(this);

    this.state = {
      randomAnswers: [],
      correctAnswer: '',
      wrongAnswer: '',
      currentQuestion: 0,
      isDisplayOn: false,
      seconds: 30,
      isAnswersDisabled: false,
      correctAnswers: 0,
    };
  }

  componentDidMount() {
    const { arrayOfQuestions } = this.props;
    const question = arrayOfQuestions[0];
    if (question) { this.randomArrayOfAnswers(); }
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_, PrevState) {
    const { randomAnswers, correctAnswers } = this.state;
    const { nome, email, score } = this.props;
    if (randomAnswers.length < 1) {
      this.randomArrayOfAnswers();
    }
    updateLocalStorage(nome, email, score, correctAnswers);
    this.verifyTimeLimit(PrevState);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  verifyTimeLimit(PrevState) {
    const { seconds } = PrevState;
    if (seconds === MIN_TIME_LIMIT) {
      clearInterval(this.intervalId);
      this.setState({
        seconds: 0,
        isDisplayOn: true,
        isAnswersDisabled: true,
      });
    }
  }

  randomArrayOfAnswers() {
    const { arrayOfQuestions } = this.props;
    const { currentQuestion } = this.state;
    const question = arrayOfQuestions[currentQuestion];
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = question;
    if (incorrectAnswers.length === 1) {
      completeAnswers = [
        {
          answer: incorrectAnswers[currentQuestion],
          isCorrect: false,
          wrongAnswerIndex: 0,
        },
        {
          answer: correctAnswer,
          isCorrect: true,
        },
      ];
    } else {
      const listOfWrongAnswers = incorrectAnswers
        .map((answer, index) => ({ answer, isCorrect: false, wrongAnswerIndex: index }));
      completeAnswers = [
        ...listOfWrongAnswers, { answer: correctAnswer, isCorrect: true }];
    }

    const randomArray = [];

    if (completeAnswers.length === 2) {
      for (let i = 0; i < arrayOfTwo.length; i += 1) {
        randomArray.push(completeAnswers[arrayOfTwo[i]]);
      }
    } else {
      for (let i = 0; i < arrayOfFour.length; i += 1) {
        randomArray.push(completeAnswers[arrayOfFour[i]]);
      }
    }

    this.setState({
      randomAnswers: randomArray,
    });
  }

  handleOptionsClick({ target: { name } }) {
    this.setState({
      correctAnswer: '3px solid rgb(6, 240, 15)',
      wrongAnswer: '3px solid rgb(255, 0, 0)',
      isDisplayOn: true,
    });
    if (name === 'correct') {
      const { currentQuestion, seconds } = this.state;
      const { updatePoints, arrayOfQuestions } = this.props;
      const assertion = {
        timer: seconds,
        difficulty: arrayOfQuestions[currentQuestion].difficulty,
      };
      this.setState((prevState) => ({
        correctAnswers: prevState.correctAnswers + 1,
      }), () => {
        finalPoints(assertion, updatePoints);
      });
    }
  }

  nextQuestionClick() {
    const four = 4;
    const { currentQuestion } = this.state;
    const { history } = this.props;
    if (currentQuestion === four) {
      history.push('/feedback');
    } else {
      this.setState({
        currentQuestion: currentQuestion + 1,
        correctAnswer: '',
        wrongAnswer: '',
        isDisplayOn: false,
      }, () => this.randomArrayOfAnswers());
    }
  }

  renderAnswers() {
    const {
      correctAnswer,
      wrongAnswer,
      randomAnswers,
      currentQuestion,
      isAnswersDisabled,
    } = this.state;
    const { arrayOfQuestions } = this.props;
    const question = arrayOfQuestions[currentQuestion];
    if (!question) {
      return (<div>Loading...</div>);
    }
    return (
      <div>
        {
          randomAnswers.map((alternative) => {
            if ('isCorrect' in alternative && alternative.isCorrect) {
              return (
                <button
                  data-testid="correct-answer"
                  type="button"
                  key={ alternative.answer }
                  onClick={ this.handleOptionsClick }
                  name="correct"
                  style={ { border: `${correctAnswer}` } }
                  disabled={ isAnswersDisabled }
                >
                  {alternative.answer}
                </button>
              );
            }
            return (
              <button
                data-testid={ `wrong-answer-${alternative.wrongAnswerIndex}` }
                type="button"
                key={ alternative.answer }
                onClick={ this.handleOptionsClick }
                name="wrong"
                style={ { border: `${wrongAnswer}` } }
                disabled={ isAnswersDisabled }
              >
                {alternative.answer}
              </button>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { arrayOfQuestions } = this.props;
    const { currentQuestion, seconds, isDisplayOn } = this.state;
    const question = arrayOfQuestions[currentQuestion];
    if (!question) {
      return (<h3>Loading...</h3>);
    }
    return (
      <div>
        <div>
          <h3>{seconds}</h3>
        </div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <h3 data-testid="question-text">{ question.question }</h3>
        {this.renderAnswers()}
        {renderButton(isDisplayOn, this.nextQuestionClick)}
      </div>
    );
  }
}

Questions.defaultProps = {
  arrayOfQuestions: PropTypes.arrayOf(PropTypes.any),
};

Questions.propTypes = {
  arrayOfQuestions: PropTypes.arrayOf(PropTypes.any),
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  nome: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  updatePoints: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  arrayOfQuestions: state.questions.responseTriviaAPI.results,
  score: state.totalPoints.score,
  nome: state.login.nome,
  email: state.login.email,
});

const mapDispatchToProps = (dispatch) => ({
  updatePoints: (assertion) => dispatch(getAssertion(assertion)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
