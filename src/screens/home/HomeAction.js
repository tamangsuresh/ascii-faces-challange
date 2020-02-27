/**
 * Constant from loading data in home page
 */
export const HOME_LOADING = 'HOME_LOADING';
export const FETCH_HOME_DATA = 'FETCH_HOME_DATA';
export const FETCH_HOME_DATA_FAILED = 'FETCH_HOME_DATA_FAILED';
export const COUNT_PAGE_NUMBER = 'COUNT_PAGE_NUMBER';

/**
 * Constant for sorting
 */

export const SORT_ITEM_SUCCESS = 'SORT_ITEM_SUCCESS';
export const SORT_ITEM_LOADING = 'SORT_ITEM_LOADING';
export const SORT_ITEM_FAILED = 'SORT_ITEM_FAILED';

/**
 * Const for ads
 */
export const ADS_LOADING = 'ADS_LOADING';
export const ADS_SUCCESS = 'ADS_SUCCESS';
export const ADS_FAILED = 'ADS_FAILED';

/**
 * Const for singleItem
 */
export const SINGLE_ITEM_SUCCESS = 'SINGLE_ITEM_SUCCESS';

import {Api} from '../../constants';

export const loading = () => {
  return {
    type: HOME_LOADING,
  };
};

export const fetchHomeData = (page, products) => {
  return async dispatch => {
    try {
      const {data, status} = await Api.paginate(page);
      // console.log(data, status);
      // console.log(products);
      if (status === 200) {
        dispatch(fetchSuccess(data));

        dispatch({type: HOME_LOADING});
        //Check product in list
        //Calling for ads
        // if (products.length > 0) {
        // dispatch(getAds(products));
        // }
      } else {
        dispatch(fetchFailed());
        dispatch({type: HOME_LOADING});
      }
    } catch (e) {
      console.log(e);
    }
  };
};

const fetchFailed = () => {
  return {
    type: FETCH_HOME_DATA_FAILED,
  };
};
const fetchSuccess = data => {
  return {
    type: FETCH_HOME_DATA,
    data,
  };
};
/**
 * @param {pageNumber:number} page
 */
export const countPage = page => {
  return {
    type: COUNT_PAGE_NUMBER,
    page,
  };
};

/**
 * Action for sorting
 * Param price,id,size
 * Method Get
 */

export const sortItem = param => {
  return async dispatch => {
    try {
      const sort = await Api.sort(param);
      dispatch({type: SORT_ITEM_LOADING});
      setTimeout(() => {
        if (sort.status === 200) {
          dispatch({type: SORT_ITEM_SUCCESS, data: param});
        } else {
          dispatch({type: SORT_ITEM_FAILED});
        }
      }, 4000);
    } catch (e) {
      console.log(e);
    }
  };
};

/**
 * Action for adding ads
 */

export const getAds = products => {
  return dispatch => {
    const adsWith = addItemEvery(
      products,
      {id: Math.random() * 1000, type: 'ads'},
      0,
      19,
    );
    dispatch({type: ADS_SUCCESS, productsWithAds: adsWith});
  };
};
/**
 * Add an item to an array at a certain frequency starting at a given index
 * @param array arr - the starting array
 * @param mixed item - the item to be inserted into the array
 * @param integer starting = the index at which to begin inserting
 * @param integer frequency - The frequency at which to add the item
 */
function addItemEvery(arr, item, starting, frequency) {
  for (var i = 0, a = []; i < arr.length; i++) {
    a.push(arr[i]);
    if ((i + 1 + starting) % frequency === 0) {
      a.push(item);
      i++;
      if (arr[i]) a.push(arr[i]);
    }
  }
  return a;
}

/**
 * Action for getting single product from list
 * Params @{index}:number
 */
export const getSingleProduct = index => {
  return dispatch => {
    dispatch({type: SINGLE_ITEM_SUCCESS, index});
  };
};
