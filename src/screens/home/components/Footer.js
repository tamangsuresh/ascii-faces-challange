import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HelperFunction} from '../../../constants';
export default function Footer({props}) {
  return (
    <View style={styles.container}>
      <Text style={styles.font18}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HelperFunction.ModerateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  font18: {
    fontSize: HelperFunction.ModerateScale(18),
  },
});
