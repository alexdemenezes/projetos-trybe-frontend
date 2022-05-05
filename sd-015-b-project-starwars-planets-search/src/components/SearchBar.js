import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function SearchBar() {
  const {
    setFilterByName,
    setApplyFilterByName,
    setApplyFilterByNumericValues,
    getFilteredValues,
    validColumns,
    column,
    setColumn,
  } = useContext(AppContext);

  // console.log(validColumns[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  return (
    <section>
      <label htmlFor="search-input">
        <input
          id="search-input"
          data-testid="name-filter"
          onChange={ (e) => {
            setFilterByName({ name: e.target.value });
            setApplyFilterByName(true);
          } }
        />
      </label>
      <div>
        <select
          name="column-filter"
          data-testid="column-filter"
          onChange={ (e) => {
            setColumn(e.target.value);
          } }
        >
          {validColumns && validColumns.map((name) => (
            <option
              value={ name }
              key={ name }
            >
              {name}
            </option>
          ))}
        </select>
        <select
          name="comparison-filter"
          data-testid="comparison-filter"
          onChange={ (e) => {
            setComparison(e.target.value);
          } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="value-filter">
          <input
            type="number"
            id="value-filter"
            value={ value }
            data-testid="value-filter"
            onChange={ (e) => {
              setValue(e.target.value);
            } }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            console.log(column);
            getFilteredValues(
              {
                column,
                comparison,
                value,
              },
            );

            setApplyFilterByNumericValues(true);
          } }
        >
          Acionar filtro

        </button>

      </div>
    </section>
  );
}

export default SearchBar;
