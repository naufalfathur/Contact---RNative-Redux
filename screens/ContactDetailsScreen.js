import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

export default class ContactDetailsScreen extends React.Component {
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
  });

  render() {
    return (
      <View>
        <Text> {this.props.navigation.getParam('phone')}</Text>
        <Button title="Go to random contact" onPress={this.goToRandomContact} />
      </View>
    );
  }

  goToRandomContact = () => {
    const contacts = this.props.screenProps.contacts;
    const phone = this.props.navigation.getParam('phone');
    let randomContact;
    while (!randomContact) {
      const randomIndex = Math.floor(Math.random() * contacts.length);
      if (contacts[randomIndex].phone !== phone) {
        randomContact = contacts[randomIndex];
      }
    }

    // this.props.navigation.navigate('ContactDetails', {
    //   ...randomContact,
    // });
    this.props.navigation.push('ContactDetails', {
      ...randomContact,
    });
  };
}
