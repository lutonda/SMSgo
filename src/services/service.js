import {NativeModules} from 'react-native';

import io from 'socket.io-client';

import {server} from '../../app.json';
export default class Service {
  constructor() {
    this.socket = io(server);
    return this;
  }
  sendSms(to, message) {
    let DirectSms = NativeModules.DirectSms;

    DirectSms.sendDirectSms(to, message);
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
