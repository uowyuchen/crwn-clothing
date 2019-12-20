import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems }) => {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <CustomButton>Go To Checkout</CustomButton>
    </div>
  );
};

const mapStateToProps = state => {
  // return { cartItems: state.cart.cartItems };
  // this will make sure that our cart dropdown component
  // is not getting re-rendered when ever the state changes that's
  // unrelated to the cart items
  return { cartItems: selectCartItems(state) };
};

export default connect(mapStateToProps)(CartDropdown);
