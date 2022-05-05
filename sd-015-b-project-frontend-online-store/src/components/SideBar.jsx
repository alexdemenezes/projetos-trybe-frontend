import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
    this.resquestCategories = this.resquestCategories.bind(this);
  }

  componentDidMount() {
    this.resquestCategories();
  }

  async resquestCategories() {
    const categoriesList = await getCategories();
    this.setState({
      categories: categoriesList,
    });
  }

  render() {
    const { handleChange } = this.props;
    const { categories } = this.state;
    return (
      <nav>
        <h3>Escolha Categoria</h3>
        { categories.map((categorie) => (
          <label
            htmlFor={ categorie.id }
            key={ categorie.id }
            data-testid="category"
          >
            <input
              type="radio"
              name="categories"
              id={ categorie.id }
              value={ categorie.id }
              onClick={ handleChange }
            />
            {categorie.name}
          </label>
        ))}
      </nav>
    );
  }
}

Sidebar.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Sidebar;
