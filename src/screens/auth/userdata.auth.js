import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import {server} from '../../../app.json';
import Station from '../../services/station';
export default class UserDataAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      station: new Station(),
    };
  }
  checkToken() {}
  login() {
    //let server = 'http://192.168.100.20:8800';
    //const {email, password} = this.state;
    debugger;
    const req = {
      email: this.state.email,
      password: this.state.password,
      station: this.state.station,
    };

    alert(JSON.stringify(req));
    axios
      .post(server + '/api/v2/staion/autehenticate', req)
      .then(res => {
        AsyncStorage.setItem(
          'station',
          JSON.stringify(res.data.station),
        ).then(res => {});
        this.props.navigation.navigate('Home');
        alert('Station succefull authenticated');
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }
  onClickListener = viewId => {
    Alert.alert('Alert', 'Button pressed ' + this.state.email);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text />
        <Image
          style={styles.bgImage}
          source={{uri: 'https://lorempixel.com/900/1400/nightlife/2/'}}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({email})}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
          />
        </View>

        <TouchableOpacity
          style={styles.btnForgotPassword}
          onPress={() => this.onClickListener('restore_password')}>
          <Text style={styles.btnText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.login()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('Qr')}>
          <Text style={styles.btnText}>QR code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#333',
    flex: 1,
    color: '#333',
  },
  inputIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#00b5ec',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage: {
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
