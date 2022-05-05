import React, { useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import requestPlanets from '../services/requestApiStarWars';
import TableLine from './TableLine';

function Table() {
  const {
    data,
    setData,
    filterByName,
    applyFilterByName,
    filteredByNumericValues,
    applyFilterByNumbericValues,
    currentIndex,
  } = useContext(AppContext);

  useEffect(() => {
    async function callApi() {
      const response = await requestPlanets();
      setData(response);
    }
    callApi();
  }, [setData]);

  function whatRenderOnScreen() {
    if (applyFilterByName) {
      const filter = filterByName.name.toLowerCase();
      return (
        data.filter(({ name }) => name.toLowerCase().includes(filter))
          .map((planet) => (
            <TableLine key={ planet.name } planet={ planet } />
          ))
      );
    }
    if (applyFilterByNumbericValues) {
      const { filterByNumericValues } = filteredByNumericValues;
      const { column, comparison, value } = filterByNumericValues[currentIndex];
      let filteredData;
      switch (comparison) {
      case 'menor que':
        filteredData = data
          .filter((obj) => Number(obj[`${column}`]) < Number(`${value}`));
        return (
          filteredData.map((planet) => (
            <TableLine key={ planet.name } planet={ planet } />
          ))
        );

      case 'igual a':
        filteredData = data
          .filter((obj) => Number(obj[`${column}`]) === Number(`${value}`));
        return (
          filteredData.map((planet) => (
            <TableLine key={ planet.name } planet={ planet } />
          ))
        );

      default:
        filteredData = data
          .filter((obj) => Number(obj[`${column}`]) > Number(`${value}`));
        return (
          filteredData.map((planet) => (
            <TableLine key={ planet.name } planet={ planet } />
          ))
        );
      }
    }

    return (
      data.map((planet) => (
        <TableLine key={ planet.name } planet={ planet } />
      ))
    );
  }

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Rotation Period</th>
        <th>Orbital Period</th>
        <th>Diameter</th>
        <th>Climate</th>
        <th>Gravity</th>
        <th>Terrain</th>
        <th>Surface Water</th>
        <th>Population</th>
        <th>Films</th>
        <th>Created</th>
        <th>Edited</th>
        <th>URL</th>
      </tr>
      {data && whatRenderOnScreen() }
    </table>
  );
}

export default Table;
