import { createSelector } from "reselect";

// state -> cart -> cartItems -> 遍历cartItems -> quantity

// 1.这是input selector，目的是拿到Redux Store
//   中的state.cart这个大大的Object并返回给selectCart
const selectCart = state => state.cart;

// 2.使用createSelector
export const selectCartItems = createSelector(
  // 2.1 这里放上面👆input selector返回的selectCart，
  //     其实就是那个大大的cart Object
  [selectCart],
  // 2.2 返回cartItems
  cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce((accumalatedQuantity, cartItem) => {
      return accumalatedQuantity + cartItem.quantity;
    }, 0)
);
