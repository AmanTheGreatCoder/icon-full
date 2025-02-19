export class ApiError {
  static SUCCESS_MESSAGE = 'Success';
  static UNAUTHORIZED_MESSAGE = 'Unauthorized';
  static INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';
  static BAD_REQUEST = 'Bad request';
  static NOT_FOUND = 'Resource not found';
}

export class ClientLogError {
  static ONLY_SELLER = 'Only sellers are authorized for this action';
  static USER_NOT_FOUND = 'User not found';
  static INVALID_DATE = 'Invalid date format';
  static PRODUCT_NOT_FOUND = 'Product not found';
  static QUANTITY_CANT_BE_ZERO = 'Quantity must be greater than zero';
  static CART_NOT_EXIST = 'Cart does not exist';
  static RATING_MUST_BE_VALID = 'Rating must be between 1 and 5';
  static COUPON_ALREADY_USED = 'This coupon has already been used';
  static COUPON_INVALID = 'Invalid coupon code';
  static COUPON_NOT_ACTIVE = 'This coupon is no longer active';
  static COUPON_NOT_VALID_FOR_THIS_TIME =
    'This coupon is not valid at this time';
  static EXCEEDS_MAX_LIMIT =
    'Order amount exceeds the maximum limit for this coupon';
  static REQ_MIN_PURCHASE =
    'Minimum purchase amount required to use this coupon';
  static COUPON_CODE_EXISTS = 'Coupon code already exists';
  static SOMETHING_WRONG = 'An error occurred. Please try again';
}
