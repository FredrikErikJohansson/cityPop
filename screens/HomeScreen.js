import React from 'react';
import { View, StyleSheet ,Text, TouchableHighlight } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'CityPop',
  };

  _onPressSearchCity() {
    this.props.navigation.navigate('Search', {
              title: 'CITY',
            });
  }

  _onPressSerchCountry() {
    this.props.navigation.navigate('Search', {
              title: 'COUNTRY',
            });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>CityPop</Text>
        <TouchableHighlight onPress={this._onPressSearchCity.bind(this)} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>SEARCH BY CITY</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressSerchCountry.bind(this)} underlayColor="white">
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
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 46,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 80,
  },
  button: {
    marginBottom: 4,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#00796b',
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
