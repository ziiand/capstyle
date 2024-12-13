import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {} 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { capName, capId, colorName, price } = action.payload;
    
      if (!capId || !colorName || !price) {
        console.error('Données manquantes pour ajouter un article au panier :', action.payload);
        return;
      }
    
      const key = `${capId}-${colorName}`;
    
      const currentItem = state.items[key] || { quantity: 0 };
    
      state.items[key] = {
        capName,
        capId,
        colorName,
        price,
        quantity: currentItem.quantity + 1,
      };
    },
    

    removeItemFromCart: (state, action) => {
      const { capName, capId, colorName, price } = action.payload;

      if (!capId || !colorName || !price) {
        console.error('Données manquantes pour retirer un article du panier :', action.payload);
        return;
      }

      const key = `${capId}-${colorName}`;

      const currentItem = state.items[key];

      if (currentItem) {
        if (currentItem.quantity === 1) {
          delete state.items[key];
        } else {
          currentItem.quantity -= 1;
        }
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
