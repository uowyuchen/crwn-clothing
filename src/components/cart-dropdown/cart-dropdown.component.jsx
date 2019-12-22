import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import "./cart-dropdown.styles.scss";

import { withRouter } from "react-router-dom";

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        Go To Checkout
      </CustomButton>
    </div>
  );
};

// const mapStateToProps = state => {
//   // return { cartItems: state.cart.cartItems };
//   // this will make sure that our cart dropdown component
//   // is not getting re-rendered when ever the state changes that's
//   // unrelated to the cart items
//   return { cartItems: selectCartItems(state) };
// };
// 上面👆的代码变成下面👇这个，下面的我们用了createStructuredSelector。
const mapStateToProps = createStructuredSelector({
  // return { cartItems: state.cart.cartItems };
  // this will make sure that our cart dropdown component
  // is not getting re-rendered when ever the state changes that's
  // unrelated to the cart items
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
