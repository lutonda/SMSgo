// eslint-disable-next-line prettier/prettier
import React, { Component } from 'react';
import AuthScreen from './auth/auth.screen';
import HomeScreen from './home/home.screen';

import AppContainer from './routes';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppContainer></AppContainer>;
    //return <Auth;></Auth;>;
  }
}
