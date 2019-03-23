import React from 'react';
import { KeyboardAvoidingView, View, StyleSheet ,Text , TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  static navigationOptions = {
    title: 'Search',
  };

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'DUMMY');

    return (
      <KeyboardAwareScrollView>
        <Text style={styles.header}>SEARCH BY {title}</Text>
          <TextInput
            style={styles.searchbar}
            placeholder={"Enter a " + title.toLowerCase()}
            onChangeText={(text) => this.setState({text})}
          />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    marginLeft: 60,
    marginRight: 60,
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 80,
  },
  searchbar: {
    fontSize: 24,
    textAlign: 'center',
    color: '#004c40',
    marginBottom: 80,
  },
});
