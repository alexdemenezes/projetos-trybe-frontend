import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [applyFilterByName, setApplyFilterByName] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [column, setColumn] = useState('population');
  const [validColumns, setValidColuns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filteredByNumericValues, setFilteredByNumericValues] = useState({
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '0',
      },
    ] });

  function removeColumn(currentColumn) {
    const newValidColumns = validColumns.filter((col) => col !== currentColumn);

    setValidColuns(newValidColumns);
    setColumn(newValidColumns[0]);
  }

  async function getFilteredValues(filteredValues) {
    removeColumn(filteredValues.column);
    console.log(filteredValues);
    const { filterByNumericValues } = filteredByNumericValues;
    setCurrentIndex(filterByNumericValues.length);
    setFilteredByNumericValues({
      filterByNumericValues: [
        ...filterByNumericValues,
        filteredValues,
      ],
    });
  }

  const [applyFilterByNumbericValues, setApplyFilterByNumericValues] = useState(false);
  const contextValue = {
    data,
    setData,
    filterByName,
    setFilterByName,
    applyFilterByName,
    setApplyFilterByName,
    filteredByNumericValues,
    setFilteredByNumericValues,
    applyFilterByNumbericValues,
    setApplyFilterByNumericValues,
    getFilteredValues,
    currentIndex,
    validColumns,
    column,
    setColumn,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
