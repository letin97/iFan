import React, { Component } from 'react';
import {
  createSwitchNavigator
} from 'react-navigation';

import SignedIn from './app/Main';
import SignedOut from './app/screens/authentication/Authentication';

import getToken from './app/api/getToken';
import checkLogin from './app/api/checkLogin';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    getToken()
      .then(token => checkLogin(token))
      .then(res => {
        if (res.token === '') this.setState({ signedIn: false });
        else this.setState({ signedIn: true });
        this.setState({ checkedSignIn: true });
      })
      .catch(err => {
          console.log(err);
          this.setState({ checkedSignIn: true });
      });
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}

const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
      {
          SignedIn: {
              screen: SignedIn
          },
          SignedOut: {
              screen: SignedOut
          }
      },
      {
          initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
      }
  );
};

