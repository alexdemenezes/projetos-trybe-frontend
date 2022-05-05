import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa os components do App', () => {
  describe('Verifica se os links estão corretos e presentes', () => {
    test('verifica se o primeiro link tem o texto "home" e está no documento"', () => {
      renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: 'Home' });

      expect(home).toBeInTheDocument();
    });

    test('verifica se  o seggundo linktem o texto "about"', () => {
      renderWithRouter(<App />);
      const about = screen.getByRole('link', { name: 'About' });

      expect(about).toBeInTheDocument();
    });

    test('verifica se o terceiro  link tem o texto "Favorite Pokémons"', () => {
      renderWithRouter(<App />);
      const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

      expect(favoritePokemons).toBeInTheDocument();
    });
  });

  test('Testa se a aplicação está redirecionando para a paǵina home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });

    userEvent.click(home);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('verifica se o link está redirecionando para a página about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });

    userEvent.click(about);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('verifica se o link está redirecionando para a página Pokemons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoritePokemons);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('verifica se redireciona para "Not found" quando não tiver resultado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/sjsjdhfdjshfjs');
    const notFound = screen.getByText(/Page requested not found/i);

    expect(notFound).toBeInTheDocument();
  });
});
