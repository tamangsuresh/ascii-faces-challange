import * as Type from './HomeAction';
const initialState = {
  loading: true,
  data: [],
  page: 0,
  sortLoading: false,
  singleProduct: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case Type.HOME_LOADING:
      return {
        ...state,
        loading: false,
      };
    case Type.FETCH_HOME_DATA: {
      return {
        ...state,
        data: [...state.data, ...action.data],
      };
    }
    case Type.FETCH_HOME_DATA_FAILED: {
      return {
        ...state,
        data: 'FAIL TO FETCH',
        loading: false,
      };
    }
    case Type.COUNT_PAGE_NUMBER:
      return {
        ...state,
        page: action.page,
      };
    case Type.SORT_ITEM_LOADING:
      return {
        ...state,
        sortLoading: true,
      };
    case Type.SORT_ITEM_SUCCESS:
      const sortData = state.data;
      sortData.sort(dynamicSort(action.data));
      return {
        ...state,
        sortLoading: false,
        data: sortData,
      };
    case Type.ADS_SUCCESS:
      return {
        ...state,
        data: action.productsWithAds,
      };
    case Type.SINGLE_ITEM_SUCCESS:
      console.log(action.index);
      const single = state.data.filter(
        (item, index) => index === action.index,
      )[0];

      return {
        ...state,
        singleProduct: single,
      };
    default:
      return state;
  }
};

/**
 * Sorting function
 * @param {id,price,size} property
 */
function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    // console.log(result);
    return result * sortOrder;
  };
}
