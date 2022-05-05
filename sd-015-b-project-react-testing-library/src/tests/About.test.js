import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa o component About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  test('verifica se contém informação do Pokedéx', () => {
    const about = screen.queryByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  test('verifica se contḿe h2 com informação sobre o Pokédex', () => {
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(h2).toBeInTheDocument();
  });

  test('verifica se contém dois paragrafos com informação sobre o pokedex', () => {
    const phraseOne = screen.getByText(/This application simulates a Pokédex/);
    const phraseTwo = screen.getByText(/One can filter Pokémons by type/);
    expect(phraseOne).toBeInTheDocument();
    expect(phraseTwo).toBeInTheDocument();
  });

  test('verifica se contém imagem do Pokedex', () => {
    const pokedexImgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgElement = screen.getByRole('img');

    expect(imgElement).toHaveAttribute('src', pokedexImgUrl);
  });
});
