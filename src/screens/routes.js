import SwitchComponent from '../components/switch.component';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {createBottomTabNavigator} from 'react-navigation-tabs';

import QrCodeAuth from './auth/qrcode.auth';
import UserDataAuth from './auth/userdata.auth';
import HomeScreen from './home/home.screen';
import DeviceScreen from './home/device.screen';
const BeforeSignIn = createStackNavigator(
  {
    Login: {
      screen: UserDataAuth,
    },
    Qr: {
      screen: QrCodeAuth,
    },
  },
  {
    headerMode: 'none',
    initialRouteKey: 'Login',
  },
);

const AfterSignIn = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Device: {
      screen: DeviceScreen,
    },
  },
  {
    initialRouteKey: 'Home',
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      showIcon: true,
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    Switch: SwitchComponent,
    App: AfterSignIn,
    Auth: BeforeSignIn,
  },
  {
    headerMode: 'none',
    initialRouteKey: 'Switch',
  },
);

export default createAppContainer(AppNavigator);
