/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>WebcheckerApp by Hapsa</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 60,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Footer;