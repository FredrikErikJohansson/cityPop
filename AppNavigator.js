import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Search: {
    screen: SearchScreen,
  },
}, {
    initialRouteName: 'Home',

    //NavBar style
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#00796b',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        //fontfamily..
      },
    },
});

export default createAppContainer(AppNavigator);
