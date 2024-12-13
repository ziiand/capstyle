import React from 'react';
import Cart from '../../store/Cart';

const CartSection = ({ cartItems, onCheckout }) => {
  return (
    <div className="cart-section">
      <Cart cartItems={cartItems} />
      <button onClick={onCheckout} className="checkout-button">
        Valider le panier
      </button>
    </div>
  );
};

export default CartSection;
