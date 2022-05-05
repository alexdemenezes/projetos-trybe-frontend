import getCurrentValueCoins from '../services/requestApiCoins';

export const LOGIN = 'LOGIN';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export function loginAction(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export function updateExpenseAction(payload) {
  return {
    type: UPDATE_EXPENSE,
    payload,
  };
}

export function loginThunk(payload) {
  return (dispatch) => {
    dispatch(loginAction(payload));
  };
}

export function updateExpenseActionThunk(payload) {
  return (dispatch) => {
    // fazer requisição
    getCurrentValueCoins()
      .then((response) => {
        const coins = response;
        dispatch(updateExpenseAction(
          {
            value: payload.value,
            description: payload.description,
            currency: payload.currency,
            method: payload.method,
            tag: payload.tag,
            exchangeRates: coins,
          },
        ));
      });

    // p
  };
}
