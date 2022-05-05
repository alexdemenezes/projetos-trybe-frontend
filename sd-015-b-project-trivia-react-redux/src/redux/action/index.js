export const EMAIL_ACTION = 'EMAIL_ACTION';
export const NAME_ACTION = 'NAME_ACTION';
export const REQUEST_QUESTION_SUCESS = 'REQUEST_QUESTION_SUCESS';
export const REQUEST_QUESTION_FAIL = 'REQUEST_QUESTION_FAIL';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

export function emailAction(payload) {
  return {
    type: EMAIL_ACTION,
    payload,
  };
}

export function nameAction(payload) {
  return {
    type: NAME_ACTION,
    payload,
  };
}

export function getAssertion(payload) {
  return {
    type: GET_ASSERTIONS,
    payload,
  };
}

export function requestQuestionSucess(payload) {
  return {
    type: REQUEST_QUESTION_SUCESS,
    payload,
  };
}

export function requestQuestionFail(error) {
  return {
    type: REQUEST_QUESTION_FAIL,
    error,
  };
}
