import React from 'react';
import { View, StyleSheet ,Text, TouchableHighlight } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>CityPop</Text>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>SEARCH BY CITY</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>SEARCH BY COUNTRY</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 72,
    color: '#004c40',
    marginBottom: 80,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#00796b'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
