import { GET_ASSERTIONS } from '../action';

const INITIAL_STATE = {
  assertions: [],
  score: 0,
  gravatarEmail: '',
};

const AssertionsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: [...state.assertions, payload],
      score: state.score + payload.score,
    };
  default:
    return state;
  }
};

export default AssertionsReducer;
