import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {Colors} from '../constants';
export default function TouchText({pressFunction, children}) {
  return (
    <TouchableOpacity style={styles.button} onPress={pressFunction}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: Colors.light_black414141,
    padding: 6,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
