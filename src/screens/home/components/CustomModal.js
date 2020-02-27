import React, {Component} from 'react';
import {Text, View, Modal, TouchableHighlight} from 'react-native';
import {Colors, HelperFunction} from '../../../constants';
import {connect} from 'react-redux';
class CustomModal extends Component {
  render() {
    const {visible, disableModal, singleProduct} = this.props;
    // console.log(itemIndex);
    // console.log(this.state.singleItem);
    // console.log(itemIndex);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableHighlight
          onPress={() => disableModal()}
          style={{
            top: HelperFunction.ModerateScale(180),
            marginHorizontal: HelperFunction.ModerateScale(60),
            backgroundColor: '#DFDFDF',
            height: HelperFunction.ModerateScale(300),
            width: HelperFunction.ModerateScale(250),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {singleProduct && (
            <Text style={{fontSize: singleProduct.size}}>
              {singleProduct.face}
            </Text>
          )}
        </TouchableHighlight>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  singleProduct: state.HomeReducer.singleProduct,
});
export default connect(mapStateToProps, null)(CustomModal);
