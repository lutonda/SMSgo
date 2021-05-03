import {NativeModules} from 'react-native';

import io from 'socket.io-client';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SmsListener from 'react-native-android-sms-listener';

import {server} from '../../app.json';
import Station from './station';

const {deviceId} = new Station();
export default class Service {
  constructor() {
    this.socket = io(server);

    this.station = new Station();
    this.socketServices();
    this.smsListenerService();
    return this;
  }
  smsListenerService() {
    SmsListener.addListener(message => {
      console.info(message);
      alert(JSON.stringify(message));
    });
  }
  socketServices() {
    this.socket.on('is-' + this.station.deviceId + '-active?', data => {
      this.socket.emit('device-is-active!', {deviceId: this.station.deviceId});
    });

    this.socket.on('start', data => {
      this.socket.emit('update-socket-id', {
        deviceId: this.station.deviceId,
        sessionId: data,
      });

      this.station.socketId = data;
    });
  }
  sendSms(to, message) {
    let DirectSms = NativeModules.DirectSms;

    DirectSms.sendDirectSms(to, message);
  }
  store(messages) {
    AsyncStorage.setItem('messages', JSON.stringify(messages));
  }
}

export class Event {
  /*
    vardate;
    type;
    text;
    success;
*/
  constructor(date, type, description, completed, color) {
    this.date = date;
    this.type = type;
    this.description = description;
    this.completed = completed;
  }
}
