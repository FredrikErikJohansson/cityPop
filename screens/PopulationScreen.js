import React from 'react';
import { View, StyleSheet ,Text } from 'react-native';

export default class PopulationScreen extends React.Component {
  static navigationOptions = {
    title: 'Population',
  };

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});