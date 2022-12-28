import React from "react";
import {
  Button,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";

import contacts, { compareNames } from "./contacts";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Row from "./Row.js";
import ContactsList from "./ContactsList";
import AddContactScreen from "./screens/AddContactScreen";
import ContactListScreen from "./screens/ContactListScreen";
import LoginScreen from "./screens/LoginScreen";
import ContactDetailsScreen from "./screens/ContactDetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchUsers } from "./api";
import { Provider } from "react-redux";
import store from './redux/store'

const ContactsTab = createStackNavigator(
  {
    AddContact: AddContactScreen,
    ContactList: ContactListScreen,
    ContactDetails: ContactDetailsScreen,
  },
  {
    initialRouteName: "ContactList",
    defaultNavigationOptions: {
      headerTintColor: "#a41034",
    },
  }
);

ContactsTab.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      <Ionicons
        name={`people${focused ? "" : "-outline"}`}
        size={25}
        color={tintColor}
      />
    );
  },
};

const MainNavigator = createBottomTabNavigator(
  {
    Contacts: ContactsTab,
    Settings: SettingsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: "#a41034",
      showIcon: true,
    },
  }
);

const InitialScreen = createSwitchNavigator(
  {
    Main: MainNavigator,
    Login: LoginScreen,
  },
  {
    initialRouteName: "Login",
  }
);

const AppNavigator = createAppContainer(InitialScreen);

export default class App extends React.Component {
  state = {
    contacts: null,
  };

  /*componentDidMount() {
    fetch('https://randomuser.me/api/?results=50')
      .then((response) => response.json())
      .then(({results}) => this.setState({contacts: results}));
  }*/

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const results = await fetchUsers();
    this.setState({ contacts: results });
  };

  addContact = (newContact) => {
    this.setState((prevState) => ({
      showForm: false,
      contacts: [...prevState.contacts, newContact],
    }));
  };

  toggleForm = () => {
    this.setState((prevState) => ({ showForm: !prevState.showForm }));
  };

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
