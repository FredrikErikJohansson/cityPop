import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getCountryCode } from '../assets/ISOconverter.js';

export default class SearchScreen extends React.Component {
  //TODO Redux
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: '',
      isLoaded: false,
      isLoading: false,
      dataSource: null,
    }
  }

  static navigationOptions = {
    title: 'CityPop',
  };

  onPressCity(cityName) {
    this.setState({
      dataSource: this.state.dataSource.filter(x => x.name === cityName),
      text: cityName,
    });
  }

  onPressButtonSearch(title) {

    if(this.state.text == ''){
      this.setState({
        error: 'Enter a ' + title.toLowerCase() + '.',
      })
      return;
    }

  const encodedName = encodeURIComponent(this.state.text);
  const encodedCountry = encodeURIComponent(getCountryCode(this.state.text.toLowerCase()));

    //fcode=PPLA == cities
    //fcode=PPLC == capitals
    //maxRows == number of wanted searchresults
    let url;
    if(title == 'CITY') {
      url = `http://api.geonames.org/searchJSON?name_equals='${encodedName}'&maxRows=5&username=weknowit&featureCode=PPLA&featureCode=PPLC`;
    }
    else {
      url = `http://api.geonames.org/searchJSON?q='${encodedName}'&maxRows=5&username=weknowit&featureCode=PPL&featureCode=PPLA&featureCode=PPLC&country='${encodedCountry}'`;
    }

    this.setState({
      isLoading: true,
    })
    fetch(url)
        .then( (response) => response.json() )
        .then( (responseJson) => {
            this.setState({
              isLoading: false,
              isLoaded: true,
              dataSource: responseJson.geonames,
            })
            if(this.state.dataSource.length < 1) {
              this.setState({
                isLoaded: false,
                error: 'No results found for ' + this.state.text + '.',
                })
            }
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
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
          <TouchableOpacity onPress={() => this.onPressButtonSearch(title)}>
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
          <TouchableHighlight key={key} onPress={this.onPressCity.bind(this, val.name)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>{val.name}</Text>
            </View>
          </TouchableHighlight>
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
    borderRadius: 5
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
  },
  searchbar: {
    fontSize: 16,
    textAlign: 'center'
  },
  populationText: {
    fontSize: 26,
    textAlign: 'center',
  },
  errorTextStyle: {
    fontSize: 15,
    marginBottom: 15,
    alignSelf: 'center',
    color: 'red'
  }
});
