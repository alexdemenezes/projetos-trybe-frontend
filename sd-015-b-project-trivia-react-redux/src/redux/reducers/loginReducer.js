import { EMAIL_ACTION, NAME_ACTION } from '../action';

const INITIAL_STATE = {
  email: '',
  nome: '',
};

const loginReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case EMAIL_ACTION:
    return {
      ...state,
      email: payload,
    };
  case NAME_ACTION:
    return {
      ...state,
      nome: payload,
    };
  default:
    return state;
  }
};

export default loginReducer;
