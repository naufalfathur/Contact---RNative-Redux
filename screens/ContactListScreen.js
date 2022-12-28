import React from "react";
import { Button, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import SectionListContacts from "../SectionListContacts";
import { connect } from "react-redux";

class ContactListScreen extends React.Component {
  state = {
    showContacts: true,
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Contact",
    headerRight: (
      <Button
        title="Add"
        onPress={() => {
          navigation.navigate("AddContact");
        }}
      />
    ),
  });

  toggleContacts = () => {
    this.setState((prevState) => ({ showContacts: !prevState.showContacts }));
  };

  showForm = () => {
    this.props.navigation.navigate("AddContact");
  };

  handleSelectContact = contact => {
    this.props.navigation.push("ContactDetails", contact);
  }

  render() {
    //const contacts =  store.getState().contacts
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        {this.state.showContacts && (
          <SectionListContacts
            contacts={this.props.contacts}
            onSelectContact={this.handleSelectContact}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});

const mapStateToProps = state => ({
  contacts: state.contacts
})

export default connect(mapStateToProps)(ContactListScreen)