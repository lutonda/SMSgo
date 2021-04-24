// eslint-disable-next-line prettier/prettier
import React, { Component } from 'react';
import {ActivityIndicator, AsyncStorage} from 'react-native';


export default class SwitchComponent extends Component {
  constructor(props) {
    super(props);
    this.check();
  }

  check() {
    debugger
    AsyncStorage.getItem('station').then(res => {
      if (res) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }

  render() {
    return <ActivityIndicator />;
  }
}