import React from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
});

export default class AddContactForm extends React.Component {
  state = {
    name: '',
    phone: '',
    isFormValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.name !== prevState.name ||
      this.state.phone !== prevState.phone
    ) {
      this.validateForm();
    }
  }

  getHandler = (key) => (val) => {
    this.setState({ [key]: val });
  };
  /*
  getHandler = key => {
    return val => {
      this.setState({[key]: val})
    }
  }
*/
  //handleNameChange = this.getHandler('name') // val=> {this.setState({name:val})}
  //handlePhoneChange = this.getHandler('phone')
  /*
  handleNameChange = (name) => {
    //this.setState({ name }, this.validateForm);
    this.setState({ name });
  };

  handlePhoneChange = (phone) => {
    if (+phone >= 0 && phone.length <= 10) {
      //this.setState({ phone }, this.validateForm);
      this.setState({ phone });
    }
  };
*/

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  validateForm = () => {
    const names = this.state.name.split(' ')
    if (
      +this.state.phone >= 0 &&
      this.state.phone.length === 10 &&
      names.length >= 2 && names[0] && names[1]
    ) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.getHandler('name')} //{this.handleNameChange}
          placeholder="Name"
        />
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.getHandler('phone')} //{this.handlePhoneChange}
          placeholder="Phone"
        />
        <Button
          disabled={!this.state.isFormValid}
          title="Submit"
          onPress={this.handleSubmit}
        />
      </KeyboardAvoidingView>
    );
  }
}
