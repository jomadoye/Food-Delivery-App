import {
  SAVE_VENDOR_DETAIL,
  SAVE_VENDOR_PRODUCT_LIST,
  SAVE_VENDOR_SINGLE_PRODUCT_DETAILS,
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
    case SAVE_VENDOR_SINGLE_PRODUCT_DETAILS:
      return { ...state, vendor_single_product_details: action.payload };
    default:
      return state;
  }
};
