import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa  o componente Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('verifica se a página contém um h2 com o texto "Encountered pokemons"', () => {
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/,
    });
    expect(h2).toBeInTheDocument();
  });
  describe('Testa  a funcionalidade do botão', () => {
    test('testa  se  o botao contém o texto "Próximo pokémon"', () => {
      const btn = screen.getByRole('button', { name: /Próximo pokémon/ });
      expect(btn).toBeInTheDocument();
    });
    test('verifica  se o próximo  pokemon é mostrado, um a um', () => {
      const btn = screen.getByRole('button', { name: /Próximo pokémon/ });
      userEvent.click(btn);
      let currentPoke = screen.getByText(/Charmander/);
      expect(currentPoke).toBeInTheDocument();
      userEvent.click(btn);
      currentPoke = screen.getByText(/Caterpie/);
      expect(currentPoke).toBeInTheDocument();
      userEvent.click(btn);
      currentPoke = screen.getByText(/Ekans/);
      expect(currentPoke).toBeInTheDocument();
      userEvent.click(btn);
      currentPoke = screen.getByText(/Alakazam/);
      expect(currentPoke).toBeInTheDocument();
    });
    test('verifica se ao clicar no botao, caso seja o ultimo, retorne ao primeiro',
      () => {
        const btn = screen.getByRole('button', { name: /Próximo pokémon/ });
        const quantityOfClicks = 8;
        for (let click = 0; click < quantityOfClicks; click += 1) userEvent.click(btn);
        let currentPoke = screen.getByText(/Dragonair/);
        expect(currentPoke).toBeInTheDocument();
        userEvent.click(btn);
        currentPoke = screen.getByText(/Pikachu/);
        expect(currentPoke).toBeInTheDocument();
      });
  });
  test('verifica  se é mostrado  um pokemon por vez', () => {
    const allPokes = screen.getAllByText(/Average weight/);
    expect(allPokes).toHaveLength(1);
  });

  describe('verifica  se o Pokedex tem os botões de filtro', () => {
    test('verifica se só tem 1 botao de filtro para cada tipo de pokemon', () => {
      const allFilterButtons = screen.getAllByTestId('pokemon-type-button');
      const quantityOfFilters = 7;
      expect(allFilterButtons).toHaveLength(quantityOfFilters);
    });

    test('verifica se um filtro for clicado, deve mostrar o pokemon daquele tipo',
      () => {
        const fireFilter = screen.getByRole('button', { name: 'Fire' });
        userEvent.click(fireFilter);
        const charmander = screen.getByText(/Charmander/);
        expect(charmander).toBeInTheDocument();
        const nextPokeBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
        userEvent.click(nextPokeBtn);
        const rapidash = screen.getByText(/Rapidash/);
        expect(rapidash).toBeInTheDocument();
        userEvent.click(nextPokeBtn);
        expect(charmander).toBeInTheDocument();
      });

    test('verifica se o texto do botao é igual ao tipo do pokemon', () => {
      const dragonFilter = screen.getByRole('button', { name: 'Dragon' });
      userEvent.click(dragonFilter);
      const PokeAndFilterText = screen.getAllByText('Dragon');
      expect(PokeAndFilterText).toHaveLength(2);
    });

    test('verifica se o botao "All" fica visível', () => {
      const fireFilter = screen.getByRole('button', { name: 'Fire' });
      userEvent.click(fireFilter);
      const allFilter = screen.getByRole('button', { name: 'All' });
      expect(allFilter).toBeInTheDocument();
      const poisonFilter = screen.getByRole('button', { name: 'Poison' });
      userEvent.click(poisonFilter);
      expect(allFilter).toBeInTheDocument();
      const dragonFilter = screen.getByRole('button', { name: 'Dragon' });
      userEvent.click(dragonFilter);
      expect(allFilter).toBeInTheDocument();
    });
  });

  describe('testa se o pokedex tem um botão para resetar o filtro',
    () => {
      test('verifica se a páginna  tem um botão com o texto "All"', () => {
        const allButton = screen.getByRole('button', { name: 'All' });
        expect(allButton).toBeInTheDocument();
      });

      test('verifica, se ao clicar no "All" são mostrados todos os pokemons sem filtro',
        () => {
          const psychicFilter = screen.getByRole('button', { name: 'Psychic' });
          userEvent.click(psychicFilter);
          const alakazam = screen.getByText(/Alakazam/);
          expect(alakazam).toBeInTheDocument();
          const allFilter = screen.getByRole('button', { name: 'All' });
          userEvent.click(allFilter);
          const pikachu = screen.getByText(/Pikachu/);
          expect(pikachu).toBeInTheDocument();
        });

      test('verifica se quando carrega a pagina o filtro selecionado é "All"', () => {
        const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
        userEvent.click(nextBtn);
        const charmander = screen.getByText(/Charmander/);
        expect(charmander).toBeInTheDocument();
        userEvent.click(nextBtn);
        const caterpie = screen.getByText(/Caterpie/);
        expect(caterpie).toBeInTheDocument();
        userEvent.click(nextBtn);
        const ekans = screen.getByText(/Ekans/);
        expect(ekans).toBeInTheDocument();
      });
    });
});
