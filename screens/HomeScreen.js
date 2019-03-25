import React from 'react';
import { View, StyleSheet ,Text, TouchableHighlight } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'CityPop',
  };

  onPressSearchCity() {
    this.props.navigation.navigate('Search', {
              title: 'CITY',
            });
  }

  onPressSerchCountry() {
    this.props.navigation.navigate('Search', {
              title: 'COUNTRY',
            });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>CityPop</Text>
        <TouchableHighlight onPress={this.onPressSearchCity.bind(this)} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>SEARCH BY CITY</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onPressSerchCountry.bind(this)} underlayColor="white">
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
    marginBottom: 8,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#00796b',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 16,
    padding: 10,
    color: 'white'
  }
});
