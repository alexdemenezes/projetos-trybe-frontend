import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testa o componente  Favorite Pokemon', () => {
  test('testa  se  quando nao encontra pokemon mostra a mensagem',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const noFavorites = screen.getByText(/No favorite pokemon found/);

      expect(noFavorites).toBeInTheDocument();
    });

  test('verfica se todos  os pokemons favoritos são mostrados', () => {
    const moreDetailsText = 'More details';

    renderWithRouter(<App />);
    let moreDetails = screen.getByRole('link', { name: moreDetailsText });
    userEvent.click(moreDetails);

    let favoritePoke = screen.getByRole('checkbox');
    userEvent.click(favoritePoke);

    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);

    let nextPoke = screen.getByText(/Próximo pokémon/);
    userEvent.click(nextPoke);

    moreDetails = screen.getByRole('link', { name: moreDetailsText });
    userEvent.click(moreDetails);

    favoritePoke = screen.getByRole('checkbox');
    userEvent.click(favoritePoke);

    userEvent.click(home);

    nextPoke = screen.getByText(/Próximo pokémon/);
    userEvent.click(nextPoke);
    userEvent.click(nextPoke);

    moreDetails = screen.getByRole('link', { name: moreDetailsText });
    userEvent.click(moreDetails);

    favoritePoke = screen.getByRole('checkbox');
    userEvent.click(favoritePoke);

    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokemons);

    const noFavorites = screen.queryByText(/No favorite pokemon found/);
    expect(noFavorites).not.toBeInTheDocument();

    const allFavorites = screen.getAllByText(/Average weight/);
    const totalExpectedFavoritePokemons = 3;
    expect(allFavorites).toHaveLength(totalExpectedFavoritePokemons);
  });
});
