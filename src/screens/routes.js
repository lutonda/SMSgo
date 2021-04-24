import SwitchComponent from '../components/switch.component';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import QrCodeAuth from './auth/qrcode.auth';
import UserDataAuth from './auth/userdata.auth';
import HomeScreen from './home/home.screen';
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

const AfterSignIn = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    headerMode: 'none',
    initialRouteKey: 'Home'},
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
