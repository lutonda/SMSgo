// eslint-disable-next-line prettier/prettier
import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {station: {user: {}}};
    this.check();
  }

  check() {
    debugger;
    AsyncStorage.getItem('station').then(res => {
      this.setState({station: JSON.parse(res)});
    });
  }

  render() {
    return (
      <View
        style={styles.card}
        onPress={() => {
          this.clickEventListener(item);
        }}>
        <Image style={styles.image} source={{uri: this.state.station.user.avatar}} />
        <View style={styles.cardContent}>
          <Text style={styles.name}>@{this.state.station.user.name} - {this.state.station.user.email}</Text>
          <Text style={styles.count}>{this.state.station.key} - {this.state.station.deviceId}</Text>
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

  card: {
    padding: 10,
    flexDirection: 'row',
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#eee',
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
