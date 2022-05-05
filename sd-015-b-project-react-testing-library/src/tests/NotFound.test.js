import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('verifica a funcionalidade do component Not found', () => {
  test('verifica se encontra um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(h2).toBeInTheDocument();
  });

  test('verifica  se mostra a imagem do picachu chorando', () => {
    renderWithRouter(<NotFound />);

    const allImages = screen.getAllByRole('img');
    const pikachuCryingImg = allImages.find((img) => img.src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');

    expect(pikachuCryingImg).toBeInTheDocument();
  });
});
