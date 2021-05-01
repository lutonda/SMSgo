import {NativeModules} from 'react-native';

import io from 'socket.io-client';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {server} from '../../app.json';
import Station from './station';

const {deviceId} = new Station();
export default class Service {
  constructor() {
    this.socket = io(server);

    this.device = new Station();
    this.socketServices();
    return this;
  }

  socketServices() {
    this.socket.on('is-' + this.device.deviceId + '-active?', data => {
      this.socket.emit('device-is-active!', {deviceId: this.device.deviceId});
    });

    this.socket.on('start', data => {
      this.socket.emit('update-socket-id', {
        deviceId: this.device.deviceId,
        sessionId: data,
      });

      this.device.socketId = data;
    });
  }
  sendSms(to, message) {
    let DirectSms = NativeModules.DirectSms;

    DirectSms.sendDirectSms(to, message);
  }
  store(messages) {
    AsyncStorage.setItem('messages', JSON.stringify(messages));

    console.warn(messages);
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
