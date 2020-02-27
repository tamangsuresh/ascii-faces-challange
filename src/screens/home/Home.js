//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  fetchHomeData,
  countPage,
  sortItem,
  getSingleProduct,
} from './HomeAction';
import {connect} from 'react-redux';
import {Item, Footer, CustomModal} from './components';
import {HelperFunction, Colors} from '../../constants';
import {TouchText} from '../../common';
const ItemWithAds = ({item, index, param}) => {
  if (item.type == 'ads') {
    return <Text>Ads</Text>;
  }
  return (
    <Item
      date={item.date}
      face={item.face}
      price={item.price}
      size={item.size}
      openModal={() => openModal(param, index)}
    />
  );
};
// create a component
class Home extends Component {
  state = {
    fetch: true,
    loading: false,
    refresh: false,
    modalVisible: false,
    itemIndex: null,
  };
  // static getDerivedStateFromProps() {}

  // static getDerivedStateFromError() {}

  // componentDidCatch() {}

  // shouldComponentUpdate() {}

  // getSnapshotBeforeUpdate() {}

  // componentDidUpdate() {}

  // componentWillUnmount() {}

  componentDidMount() {
    this.setState({refresh: true}, () => fetchApi(this));
  }

  render() {
    const {data, loading, sortLoading, sortItem} = this.props;
    const {refresh, modalVisible, itemIndex} = this.state;
    // console.log(modalVisible);
    // console.log(sortLoading);
    // console.log(this.props.page);
    // console.log(this.state.fetch);
    // const duplicateRemove = data
    //   .map(e => e['id'])
    //   // store the keys of the unique objects
    //   .map((e, i, final) => final.indexOf(e) === i && i)
    //   // eliminate the dead keys & store unique objects
    //   .filter(e => data[e])
    //   .map(e => data[e]);
    // <img class="ad" src="/ads/?r=' + Math.floor(Math.random()*1000) + '"/>
    // console.log(data.map((item, index) => console.log(index)));
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.row, styles.justify, styles.marginV]}>
          <Text style={styles.head}>Sort By</Text>
          <TouchText pressFunction={() => sortItem('size')}>Size</TouchText>
          <TouchText pressFunction={() => sortItem('price')}>price</TouchText>
          <TouchText pressFunction={() => sortItem('id')}>id</TouchText>
        </View>

        {loading || sortLoading ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={data}
            extraData={data}
            refresh={refresh}
            keyExtractor={() => generateRandom().toString()}
            renderItem={({item, index}) => (
              <ItemWithAds item={item} index={index} param={this} />
            )}
            onEndReachedThreshold={0.5}
            onEndThreshold={0.5}
            onEndReached={() => paginate(this)}
            ListFooterComponent={() => <Footer />}
            ListFooterComponentStyle={styles.loader}
          />
        )}
        <CustomModal
          visible={modalVisible}
          disableModal={() => disableModal(this)}
          itemIndex={itemIndex}
        />
      </SafeAreaView>
    );
  }
}

/**
 * Action
 */
/**
 * Fetch Api
 * @param {params} params
 */
const fetchApi = params => {
  const {page, fetchHomeData, data} = params.props;
  if (params.state.fetch) {
    fetchHomeData(page, (products = data));
  }
  params.setState({fetch: false});
};

/**
 * fetch new data
 * @param {params} price
 */

const paginate = params => {
  params.setState({fetch: true}, () => {
    params.props.countPage(params.props.page + 1), fetchApi(params);
  });
};

/**
 * Helper function
 */
//generate randaom number

function generateRandom() {
  return Math.random();
}

/**
 * Disable Modal
 */

const disableModal = params => {
  params.setState({modalVisible: !params.state.modalVisible, itemIndex: null});
};

/**
 * Open modal
 */
const openModal = (params, index) => {
  params.setState({modalVisible: !params.state.modalVisible, itemIndex: index});
  params.props.getSingleProduct(index);
};

// define your styles
const styles = StyleSheet.create({
  loader: {
    alignItems: 'center',
    marginBottom: HelperFunction.ModerateScale(50),
  },
  justify: {
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
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
  marginV: {
    marginVertical: 10,
  },
});

//make this component available to the app
const mapStateToProps = state => ({
  data: state.HomeReducer.data,
  loading: state.HomeReducer.loading,
  page: state.HomeReducer.page,
  sortLoading: state.HomeReducer.sortLoading,
});
export default connect(mapStateToProps, {
  fetchHomeData,
  countPage,
  sortItem,
  getSingleProduct,
})(Home);
