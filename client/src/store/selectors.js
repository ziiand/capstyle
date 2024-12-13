export const selectCartItems = (state) => {
    return Object.values(state.cart.items);
  };
  