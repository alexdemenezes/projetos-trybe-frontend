import PropTypes from 'prop-types';
import React from 'react';

function TableLine({ planet }) {
  return (
    <tr>
      <td>{planet.name}</td>
      <td>{ planet.rotation_period }</td>
      <td>{ planet.orbital_period }</td>
      <td>{ planet.diameter }</td>
      <td>{ planet.climate }</td>
      <td>{ planet.gravity }</td>
      <td>{ planet.terrain }</td>
      <td>{ planet.surface_water }</td>
      <td>{ planet.population }</td>
      <td>{ planet.films.join([', '])}</td>
      <td>{ planet.created }</td>
      <td>{ planet.edited }</td>
      <td>{ planet.url }</td>
    </tr>
  );
}

TableLine.propTypes = {
  planet: PropTypes.shape(PropTypes.any).isRequired,
};

export default TableLine;
