import React from 'react';
import {
  Button,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import Row from './Row.js';

const renderItem = (obj) => <Row {...obj.item} />; //same as name : {...obj.item.name} phone : {...obj.item.phone}
const renderSectionHeader = (obj) => <Text>{obj.section.title}</Text>;

const ContactsList = (props) => {
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase()
    return{
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  },{})

  const sections = Object.keys(contactsByLetter).sort().map(letter => ({
    title: letter,
    data: contactsByLetter[letter]
  }))
  return (
    <SectionList
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      /*sections={[
        {
          title: 'A',
          data: props.contacts,
        },
      ]}*/
      sections={sections}
    />
  );
};

ContactsList.PropTypes = {
  contacts: PropTypes.array,
};

export default ContactsList;
