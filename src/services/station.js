import DeviceInfo from 'react-native-device-info';

export default class Station {
  constructor() {
    DeviceInfo.getIpAddress().then(ip => {
      this.currentIpAddress = ip;
    });
    this.uuid = DeviceInfo.getUniqueId();
    //logs.push(moment().format() + ': PhoneNumber >' + RNSimData.getTelephoneNumber());
    //logs.push(moment().format() + ': Country Code >' + RNSimData.getCountryCode());
    this.brand = DeviceInfo.getBrand();
    this.carrier = DeviceInfo.getCarrier();
    this.model = DeviceInfo.getModel();
    this.deviceId = DeviceInfo.getUniqueId();
    this.systemVersion = DeviceInfo.getSystemVersion();
    this.systemName = DeviceInfo.getSystemName();

    DeviceInfo.getCarrier().then(x => (this.carrier = x));
    DeviceInfo.getPhoneNumber().then(x => (this.phoneNumber = x));
    //this.deviceCountry = DeviceInfo.getDeviceCountry();
    //this.ip = DeviceInfo.getIPAddress();
    this.socketId = 0;
    return this;
  }
}
