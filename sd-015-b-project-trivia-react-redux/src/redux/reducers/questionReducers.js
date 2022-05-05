import { REQUEST_QUESTION_SUCESS } from '../action/index';

const INITIAL_STATE = {
  responseTriviaAPI: {},
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTION_SUCESS:
    return {
      ...state,
      responseTriviaAPI: action.payload,
    };
  default:
    return state;
  }
};

export default questionReducer;
