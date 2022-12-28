import React from "react";
import { Button, View, StyleSheet, Text, TextInput } from "react-native";
import Constants from "expo-constants";
import {login} from '../api'

export default class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("name"),
    headerRight: (
      <Button
        title="Add"
        onPress={() => {
          navigation.navigate("AddContact");
        }}
      />
    ),
  });

  state = {
    username: "",
    password: "",
  };

  _login = async () => {
    try{
      const success = await login(this.state.username, this.state.password)
      this.props.navigation.navigate('Main')
    } catch(err) {
      const errMessage = err.message
      this.setState({err: errMessage})
    }
  };

  handleUsernameUpdate = (username) => {
    this.setState({ username });
  };

  handlePasswordUpdate = (password) => {
    this.setState({ password });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.err}</Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={this.state.username}
          onChangeText={this.handleUsernameUpdate}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={this.state.password}
          onChangeText={this.handlePasswordUpdate}
          secureTextEntry
        />
        <Button title="Press to Log In" onPress={this._login} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
  },
  text: {
    color: "red",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
});
