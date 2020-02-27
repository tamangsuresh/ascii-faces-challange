import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, HelperFunction} from '../../../constants';
import {connect} from 'react-redux';
import {sortItem} from './../HomeAction';
import {TouchText} from '../../../common';
function Header({sortItem}) {
  return (
    <View style={[styles.container, styles.justify]}>
      <Text style={styles.head}>Buy Ascii Faces</Text>
      <View style={[styles.row, styles.justify]}>
        <Text style={styles.head}>Sort</Text>
        <TouchText pressFunction={() => sortItem('size')}>Size</TouchText>
        <TouchText pressFunction={() => sortItem('price')}>price</TouchText>
        <TouchText pressFunction={() => sortItem('id')}>id</TouchText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  justify: {
    justifyContent: 'space-around',
  },
  container: {
    flexDirection: 'row',
    borderBottomColor: Colors.gray_848484,
    paddingVertical: 8,
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.light_black414141,
    padding: 6,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
export default connect(null, {sortItem})(Header);
