import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ButtonConfig extends Component {
  render() {
    return (
      <section>
        <Link
          to="/config"
          data-testid="btn-settings"
        >
          Configurações
        </Link>
      </section>
    );
  }
}
