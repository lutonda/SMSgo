import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import moment from 'moment';

import HeaderComponent from '../../components/header.component';
import Service, {Event} from '../../services/service';
import Station from '../../services/station';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import EventCardComponent from '../../components/eventcard.component';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSending: false,
      connected: false,
      station: {user: {}},
      data: [],
    };
    this.service = new Service();
  }
  componentDidMount() {
    AsyncStorage.getItem('station').then(res => {
      this.setState({station: JSON.parse(res)});
    });
    AsyncStorage.getItem('messages').then(res => {
      this.setState({data: JSON.parse(res) || []});
    });

    this.socket = this.service.socket;
    this.socketListner();
  }
  socketListner() {
    this.socket.on('disconnect', data => {
      this.eventCallback({
        message: ':: Connection to server lost.',
        date: moment().format(),
        color: '#ccc',
        completed: 0,
        type: 0,
        id: Math.random().toString(16).substr(2),
      });
    });

    this.socket.on('start', data => {
      this.setState({connected: true});
      this.eventCallback({
        message: '>Connected to server ' + this.socket.id,
        date: moment().format(),
        color: '#ccc',
        completed: 1,
        type: 0,
        id: Math.random().toString(16).substr(2),
      });
    });

    this.socket.on('connction-send-sms-' + new Station().deviceId, data => {
      this.setState({isSending: true});
      this.service.sendSms(data.to, data.message);
      setTimeout(() => this.setState({isSending: false}), 10000);

      this.eventCallback({
        to: data.to,
        message: data.message,
        date: moment().format(),
        color: '#4CAF50',
        completed: 1,
        type: 1,
        id: data.uuid,
      });
    });
  }
  eventCallback(event) {
    let data = this.state.data;
    data.push(event);
    this.service.store(data);

    this.setState({data});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 100, backgroundColor: '#444'}}>
          <HeaderComponent
            status={this.state.connected}
            isSending={this.state.isSending}
          />
        </View>
        <FlatList
          style={styles.tasks}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .reverse()}
          keyExtractor={item => Math.random().toString(16).substr(2)}
          renderItem={({item}) => <EventCardComponent event={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  tasks: {
    flex: 1,
  },
});
