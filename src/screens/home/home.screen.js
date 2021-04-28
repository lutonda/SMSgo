import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';

import moment from 'moment';

import HeaderComponent from '../../components/header.component';
import Service, {Event} from '../../services/service';
import Station from '../../services/station';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      station: {user: {}},
      data: [],
    };
  }
  componentDidMount() {
    this.service = new Service();

    AsyncStorage.getItem('station').then(res => {
      this.setState({station: JSON.parse(res)});
    });

    this.socket = this.service.socket;
    this.socketListner();
  }
  socketListner() {
    this.socket.on('disconnect', data => {
      this.eventCallback({
        id: 1,
        description: ':: Connection to server lost.',
        date: moment().format(),
        color: '#ccc',
        completed: 0,
      });
    });

    this.socket.on('start', data => {
      this.setState({connected: true});
      this.eventCallback({
        id: 1,
        description:
          ':: Connected to socket server \n \t with device ID ' +
          new Station().deviceId,
        date: moment().format(),
        color: '#ccc',
        completed: 1,
      });
    });

    this.socket.on('connction-send-sms-' + new Station().deviceId, data => {
      this.service.sendSms(data.to, data.message);
      alert('bravo')
      console.warn(data)
      this.eventCallback({
        id: 1,
        description:
          'SMS request to: ' + data.to + '\n message: ' + data.message,
        date: moment().format(),
        color: '##4CAF50',
        completed: 1,
      });
    });
  }
  eventCallback(event) {
    let data = this.state.data;
    data.push(event);
    this.setState({data});
  }
  clickEventListener = item => {
    Alert.alert('Item selected: ' + item.description);
  };

  __getCompletedIcon = item => {
    if (item.completed === 1) {
      return 'https://img.icons8.com/flat_round/64/000000/checkmark.png';
    } else {
      return 'https://img.icons8.com/flat_round/64/000000/delete-sign.png';
    }
  };

  __getDescriptionStyle = item => {
    if (item.completed === 1) {
      return {
        textDecorationLine: 'line-through',
        fontStyle: 'italic',
        color: '#808080',
      };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 100, backgroundColor: '#444'}}>
          <HeaderComponent
            station={this.state.station}
            status={this.state.connected}
          />
        </View>
        <FlatList
          style={styles.tasks}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data.reverse()}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[styles.card, {borderColor: item.color}]}
                onPress={() => {
                  this.clickEventListener(item);
                }}>
                <Image
                  style={styles.image}
                  source={{uri: this.__getCompletedIcon(item)}}
                />
                <View style={styles.cardContent}>
                  <Text style={[styles.description]}>{item.description}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
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
  cardContent: {
    marginLeft: 20,
    marginTop: 0,
  },
  image: {
    width: 15,
    height: 15,
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftWidth: 6,
  },

  description: {
    fontSize: 18,
    flex: 1,
    color: '#008080',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    flex: 1,
    color: '#696969',
    marginTop: 5,
  },
});
