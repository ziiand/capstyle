import React from 'react';
import '../styles/Cart.scss';

function Cart({ cartItems }) {
  if (cartItems.length === 0) {
    return <p>Votre panier est vide</p>;
  }

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h3>Panier</h3>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.capName} ({item.colorName}) x {item.quantity} = {item.price * item.quantity} €
          </li>
        ))}
      </ul>
      <h4>Montant total : {totalAmount} €</h4>
    </div>
  );
}

export default Cart;

