import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, HelperFunction} from '../../../constants';
export default function Item({face, date, price, size, openModal}) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => openModal()}>
      <Text
        style={{
          fontSize: size,
          paddingVertical: 30,
        }}>
        {face}{' '}
      </Text>
      <View style={styles.priceAndDate}>
        <Text style={styles.paddingBottom}>
          {HelperFunction.generateRelativeDate(date)}
        </Text>
        <Text style={styles.paddingBottom}>
          {`$` + HelperFunction.formatCentToDollar(price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    marginHorizontal: HelperFunction.ModerateScale(15),
    borderRadius: 7,
    borderColor: Colors.black_000000,
    borderColor: Colors.gray_848484,
    borderWidth: 2,
    height: HelperFunction.ModerateScale(150),
    width: HelperFunction.ModerateScale(350),
    backgroundColor: Colors.whiteopacity_FFFFFF50,
  },

  priceAndDate: {
    alignItems: 'center',
    marginVertical: 8,
  },
  paddingBottom: {
    paddingBottom: 10,
  },
});
