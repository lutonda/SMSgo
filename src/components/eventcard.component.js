// eslint-disable-next-line prettier/prettier
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TimeAgo from 'react-native-timeago';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';

export default class EventCardComponent extends Component {
  constructor(props) {
    super(props);
    this.check();
  }

  check() {
    AsyncStorage.getItem('station').then(res => {
      if (res) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
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
      <Collapse>
        <CollapseHeader
          style={[
            [styles.system, styles.message][this.props.event.type],
            styles.card,
            {borderColor: this.props.event.color},
          ]}>
          {this.props.event.type === 1 ? (
            <Image
              style={styles.image}
              source={{uri: this.__getCompletedIcon(this.props.event)}}
            />
          ) : null}
          <View style={styles.cardContent}>
            {this.props.event.type === 1 ? (
              <Text>{this.props.event.to}</Text>
            ) : null}
            <Text
              style={
                [styles.error, styles.info, styles.description][
                  this.props.event.type + this.props.event.completed
                ]
              }>
              {this.props.event.message}
            </Text>
            <TimeAgo time={this.props.event.date} interval={1000} />
          </View>
        </CollapseHeader>

        <CollapseBody
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 30,
            marginRight: 30,
          }}>
          <View style={{flex: 1}}>
            <Text>{this.props.event.id}</Text>
          </View>
          <View style={{flex: 1, textAlign: 'right'}}>
            <Text style={{textAlign: 'right'}}>{this.props.event.date}</Text>
          </View>
        </CollapseBody>
      </Collapse>
    );
  }
}

const styles = StyleSheet.create({
  cardContent: {
    marginLeft: 5,
    marginTop: 0,
  },
  image: {
    width: 15,
    height: 15,
  },
  message: {
    borderLeftWidth: 6,
    backgroundColor: '#FFF',
  },
  system: {
    borderWidth: 0.3,
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

    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  description: {
    fontSize: 18,
    flex: 1,
    color: '#008080',
    fontWeight: 'bold',
  },
  error: {
    color: '#900',
  },
  info: {
    color: '#000080',
  },
  date: {
    fontSize: 14,
    flex: 1,
    color: '#696969',
    marginTop: 5,
  },
});
