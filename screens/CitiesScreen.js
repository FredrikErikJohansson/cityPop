import React from 'react';
import { View, StyleSheet ,Text } from 'react-native';

export default class CitiesScreen extends React.Component {
  static navigationOptions = {
    title: 'Cities',
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
