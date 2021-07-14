import React from "react";

const CartContext = React.createContext({
  items: [], // {id, amount, price}
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (id) => { },
  clearItems: () => {},
});

export default CartContext;
