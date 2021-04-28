// eslint-disable-next-line prettier/prettier
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {station: {user: {}}};
    
  }

  componentDidMount() {
    AsyncStorage.getItem('station').then(res => {
      this.setState({station: JSON.parse(res)});
    });
  }

  render() {
    return (
      <View
        style={[
          styles.card,
          this.props.status ? styles.connected : styles.disconnected,
        ]}>
        <Image
          style={styles.image}
          source={{uri: this.state.station.user.avatar}}
        />
        <View style={styles.cardContent}>
          <Text style={styles.name}>
            @{this.state.station.user.name} - {this.state.station.user.email} - {this.props.status}
          </Text>
          <Text style={styles.count}>
            {this.state.station.key} *- {this.state.station.deviceId}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ebf0f7',
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#ebf0f7',
  },
  connected: {backgroundColor: '#c6efdc'},
  disconnected: {backgroundColor: '#ddd'},
  card: {
    padding: 10,
    flexDirection: 'row',
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#333',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  followButtonText: {
    color: '#dcdcdc',
    fontSize: 12,
  },
});
