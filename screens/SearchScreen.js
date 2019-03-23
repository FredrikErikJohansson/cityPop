import React from 'react';
import { KeyboardAvoidingView, View, StyleSheet ,Text , TextInput, TouchableOpacity, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  static navigationOptions = {
    title: 'Search',
  };

  _onPressButtonSearch(title) {
    if(title == 'CITY') {
      this.props.navigation.navigate('Population');
    }
    else {
      this.props.navigation.navigate('Cities');
    }
  }

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'DUMMY');

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>SEARCH BY {title}</Text>
        <View style={styles.searchbarBorder}>
          <TextInput
            style={styles.searchbar}
            maxLength={24}
            placeholder={"Enter a " + title.toLowerCase() + "..."}
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        <TouchableOpacity onPress={() => this._onPressButtonSearch(title)}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={require('../assets/icon_search.png')}
                  />
                </TouchableOpacity>
      </KeyboardAwareScrollView>
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
    fontSize: 36,
    marginLeft: 60,
    marginRight: 60,
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 80,
  },
  searchbarBorder: {
    width: 260,
    padding: 10,
    marginBottom: 80,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#C7C7CD',
  },
  searchbar: {
    fontSize: 16,
    textAlign: 'center',
    //color: '#004c40',
  },
});
