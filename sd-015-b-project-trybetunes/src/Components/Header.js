import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
    this.requestUser = this.requestUser.bind(this);
  }

  componentDidMount() {
    this.requestUser();
  }

  requestUser() {
    this.setState({
      loading: true,
    }, async () => {
      const objUser = await getUser();
      this.setState({
        name: objUser.name,
        loading: false,
      });
    });
  }

  render() {
    const { loading, name } = this.state;

    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <header
        data-testid="header-component"
      >
        <h2 data-testid="header-user-name">{ name }</h2>
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
