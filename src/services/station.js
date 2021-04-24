import DeviceInfo from 'react-native-device-info';

export default class Station {
  constructor() {
    DeviceInfo.getIpAddress().then(ip => {
      this.currentIpAddress = ip;
    });
    this.uuid = DeviceInfo.getUniqueId();
    //logs.push(moment().format() + ': PhoneNumber >' + RNSimData.getTelephoneNumber());
    //logs.push(moment().format() + ': Country Code >' + RNSimData.getCountryCode());
    this.model = DeviceInfo.getModel();
    this.deviceId = DeviceInfo.getUniqueId();
    this.systemVersion = DeviceInfo.getSystemVersion();
    this.systemName = DeviceInfo.getSystemName();
    this.deviceCountry = 'AO';
  }
}
