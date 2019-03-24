import React from 'react';
import { KeyboardAvoidingView, View, StyleSheet ,Text , TextInput, TouchableOpacity, Image, ActivityIndicator, TouchableHighlight} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SearchScreen extends React.Component {
  //TODO Redux
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: false,
      isLoaded: false,
      dataSource: null,
    }
  }

  static navigationOptions = {
    title: 'CityPop',
  };

  _onPressCity() {
    console.log("You Pressed button");
  }

  _onPressButtonSearch(title) {

    //TODO: Add wrong input handler

    const encodedValue = encodeURIComponent(this.state.text);
    //fcode=PPLA == cities
    //fcode=PPLC == capitals
    //maxRows == number of wanted searchresults
    let url = `http://api.geonames.org/searchJSON?q='${encodedValue}'&maxRows=5&username=weknowit&featureCode=PPLA&featureCode=PPLC`;
    this.setState({
      isLoading: true,
    })
    return fetch(url)
        .then( (response) => response.json() )
        .then( (responseJson) => {
            this.setState({
              isLoading: false,
              isLoaded: true,
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

    if(!this.state.isLoading && !this.state.isLoaded)
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
    else if(this.state.isLoading) {
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
          <ActivityIndicator/>
        </KeyboardAwareScrollView>
      )
    }

    else {
      let cities = this.state.dataSource.map((val, key) => {
        if(this.state.dataSource.length > 1) {
          return (
            <View key={key}>
            <TouchableHighlight onPress={this._onPressCity()} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>{val.name}</Text>
              </View>
            </TouchableHighlight>
            </View>
          )
        }
        else {
          return (
            <View style={styles.searchbarBorder} key={key}>
              <Text style={styles.searchbar}>Population</Text>
              <Text style={styles.populationText}>{val.population}</Text>
            </View>
          )
        }
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
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 40,
    marginRight: 40,
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
  button: {
    marginBottom: 2,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#00796b',
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  searchbar: {
    fontSize: 16,
    textAlign: 'center'
  },
  populationText: {
    fontSize: 26,
    textAlign: 'center',
  }
});
