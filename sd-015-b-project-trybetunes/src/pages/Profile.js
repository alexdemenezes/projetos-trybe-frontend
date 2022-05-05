import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loginInfo: {},
      loading: false,
      foundUser: false,
    };
    this.requestApi = this.requestApi.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
  }

  componentDidMount() {
    this.requestApi();
  }

  requestApi() {
    this.setState({
      loading: true,
    }, async () => {
      const result = await getUser();
      const found = Object.keys(result).length > 0;
      this.setState({
        loginInfo: result,
        loading: false,
        foundUser: found,
      });
    });
  }

  showUserInfo() {
    const { loginInfo } = this.state;
    const { name, email, image, description } = loginInfo;
    const EditarPerfil = () => (<Link to="/profile/edit">Editar perfil</Link>);
    return (
      <section>
        <section>
          <img
            src={ image }
            alt={ name }
            data-testid="profile-image"
          />
        </section>
        <section>
          <EditarPerfil />
        </section>
        <section>
          <h3>Nome:</h3>
          <p>{name}</p>
        </section>
        <section>
          <h3>Email:</h3>
          <p>{email}</p>
        </section>
        <section>
          <h3>Descrição:</h3>
          <p>{description}</p>
        </section>
      </section>
    );
  }

  render() {
    const { loading, foundUser } = this.state;
    return (
      <div data-testid="page-profile">
        {loading && <Loading />}
        {foundUser && this.showUserInfo()}

      </div>
    );
  }
}

export default Profile;

// {
//   name: '',
//   email: '',
//   image: '',
//   description: '',
// }
