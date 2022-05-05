import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente pokemon', () => {
  const nextPokeText = 'Próximo pokémon';
  const PIKACHU_IMG_URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  const CHARMANDER_IMG_URL = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';

  describe('testa se o card o pokemon especifico é renderizado.',
    () => {
      beforeEach(() => {
        renderWithRouter(<App />);
      });

      test('verifica se o nome do pokemon é mostrado corretamente.', () => {
        let pokeName = screen.getByTestId('pokemon-name');
        expect(pokeName).toHaveTextContent('Pikachu');
        const nextBtn = screen.getByRole('button', { name: nextPokeText });
        userEvent.click(nextBtn);
        pokeName = screen.getByTestId('pokemon-name');
        expect(pokeName).toHaveTextContent('Charmander');
      });

      test('verifica se o tipo do pokemon é mostrado corretamente.', () => {
        let type = screen.getByTestId('pokemon-type');
        expect(type).toHaveTextContent('Electric');
        const dragonFilter = screen.getByRole('button', { name: 'Dragon' });
        userEvent.click(dragonFilter);
        type = screen.getByTestId('pokemon-type');
        expect(type).toHaveTextContent('Dragon');
      });

      test('verifica se a weight e weight measurement são mostrados corretamente',
        () => {
          let weigthAndMeasurementUnit = screen.getByTestId('pokemon-weight');
          expect(weigthAndMeasurementUnit).toHaveTextContent('Average weight: 6.0 kg');
          const nextBtn = screen.getByRole('button', { name: nextPokeText });
          userEvent.click(nextBtn);
          weigthAndMeasurementUnit = screen.getByTestId('pokemon-weight');
          expect(weigthAndMeasurementUnit).toHaveTextContent('Average weight: 8.5 kg');
        });

      test('verifica se  a imagem é mostrada corretamente', () => {
        let pokemon = screen.getByRole('img');
        expect(pokemon).toHaveAttribute('src', PIKACHU_IMG_URL);
        expect(pokemon).toHaveAttribute('alt', 'Pikachu sprite');
        const nextBtn = screen.getByRole('button', { name: nextPokeText });
        userEvent.click(nextBtn);
        pokemon = screen.getByRole('img');
        expect(pokemon).toHaveAttribute('src', CHARMANDER_IMG_URL);
        expect(pokemon).toHaveAttribute('alt', 'Charmander sprite');
      });
    });

  test('verifica se o pokemon card tem um link "More details"', () => {
    renderWithRouter(<App />);
    let moreDetails = screen.getByRole('link', { name: /More details/ });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    const nextBtn = screen.getByRole('button', { name: nextPokeText });
    userEvent.click(nextBtn);
    moreDetails = screen.getByRole('link', { name: /More details/ });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/4');
  });

  test('verifica se clicar no link é redirecionado corretamente', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/ });
    userEvent.click(moreDetails);
    const gameLocations = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/,
    });
    expect(gameLocations).toBeInTheDocument();
  });

  test('vrifica se a url no browser esá correta.', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  describe('Testa se tem um icone de estrela nos pokemons favoritos', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    test('verifica se o icone de estrela é mostrado corretamente', () => {
      const moreDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetails);
      const checkbox = screen.getByRole('checkbox');
      userEvent.click(checkbox);
      const checkIcon = screen.getByAltText('Pikachu is marked as favorite');
      expect(checkIcon).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
