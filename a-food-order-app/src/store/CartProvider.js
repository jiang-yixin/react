import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

const cartStateReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;

    if (existingItem) {
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalPrice: state.totalPrice + action.item.price * action.item.amount,
    };
  } else if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalPrice = state.totalPrice - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
    }

    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartStateReducer,
    defaultCartState
  );

  const addItemToCart = (item) => {
    dispatchCartState({ type: "ADD", item });
  };

  const removeItemFromCart = (id) => {
    dispatchCartState({ type: "REMOVE", id });
  };

  const cartContext = {
    items: cartState.items,
    totlaPrice: cartState.totalPrice,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
