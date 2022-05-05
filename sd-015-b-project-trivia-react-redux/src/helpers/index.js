import React from 'react';

const HELPER_SORT_NUMBER = 0.5;

export const arrayOfFour = ['0', '1', '2', '3']
  .sort(() => HELPER_SORT_NUMBER - Math.random());

export const arrayOfTwo = ['0', '1']
  .sort(() => HELPER_SORT_NUMBER - Math.random());

export const updateLocalStorage = (nome, email, score, correctAnswers) => {
  if (score) {
    localStorage.setItem('state', JSON.stringify({
      player: {
        name: nome,
        assertions: correctAnswers,
        score,
        email,
      },
    }));
  }
};

export function renderButton(isDisplayOn, nextQuestionClick) {
  if (isDisplayOn) {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ nextQuestionClick }
      >
        Próxima
      </button>
    );
  }
}
