import {
  SAVE_VENDOR_DETAIL,
  SAVE_VENDOR_PRODUCT_LIST
} from './types';

export const saveVendorDetail = (vendorDetails) => {
  return (dispatch) => {
        dispatch({ type: SAVE_VENDOR_DETAIL, payload: vendorDetails});
  };
};

export const saveVendorProductsList = (vendorProducts) => {
  return (dispatch) => {
        dispatch({ type: SAVE_VENDOR_PRODUCT_LIST, payload: vendorProducts});
  };
};
