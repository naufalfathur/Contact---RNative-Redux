import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('name'),
    headerRight: (
      <Button
        title="Add"
        onPress={() => {
          navigation.navigate('AddContact');
        }}
      />
    ),
    tabBarIcon: ({ focused, tintColor }) => {
      return <Ionicons
        name={`cog`}
        size={25}
        color={tintColor}
      />;
    },
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Settings coming soon</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
