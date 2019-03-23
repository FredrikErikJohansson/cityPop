import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import CitiesScreen from './screens/CitiesScreen';
import PopulationScreen from './screens/PopulationScreen';


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Search: {
    screen: SearchScreen,
  },
  Cities: {
    screen: CitiesScreen,
  },
  Population: {
    screen: PopulationScreen,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);
