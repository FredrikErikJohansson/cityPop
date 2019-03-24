import React from 'react';
import { KeyboardAvoidingView, View, StyleSheet ,Text , TextInput, TouchableOpacity, Image, ActivityIndicator, FlatList} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SearchScreen extends React.Component {
  //TODO Redux
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: true,
      dataSource: null,
    }
  }

  static navigationOptions = {
    title: 'CityPop',
  };

  _onPressButtonSearch(title) {

    //TODO: Add wrong input handler

    const encodedValue = encodeURIComponent(this.state.text);
    //fcode=PPLA == cities
    //fcode=PPLC == capitals
    let url = `http://api.geonames.org/searchJSON?q='${encodedValue}'&maxRows=10&username=weknowit&featureCode=PPLA&featureCode=PPLC`;

    return fetch(url)
        .then( (response) => response.json() )
        .then( (responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson.geonames,
            })
        })

      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'DUMMY');

    if(this.state.isLoading)
    {
      return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.header}>SEARCH BY {title}</Text>
          <View style={styles.searchbarBorder}>
            <TextInput
              style={styles.searchbar}
              maxLength={24}
              placeholder={"Enter a " + title.toLowerCase() + "..."}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          </View>
          <TouchableOpacity onPress={() => this._onPressButtonSearch(title)}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../assets/icon_search.png')}
          />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      )
    }
    else {

      let cities = this.state.dataSource.map((val, key) => {
        return <View key={key}><Text>{val.name}, {val.population}</Text></View>
      });

      return (
        <View style={styles.container}>
          <Text style={styles.header}>{this.state.text}</Text>
          {cities}
        </View>
      );
    }
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
  item: {
    textAlign: 'center',
    //color: '#004c40',
  },
});
