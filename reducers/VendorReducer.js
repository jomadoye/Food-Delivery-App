import {
  SAVE_VENDOR_DETAIL,
  SAVE_VENDOR_PRODUCT_LIST
} from '../actions/types';

const INITIAL_STATE = {
  vendor: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_VENDOR_DETAIL:
      return { ...state, vendor: action.payload };
    case SAVE_VENDOR_PRODUCT_LIST:
      return { ...state, vendor_product_list: action.payload };
    default:
      return state;
  }
};
