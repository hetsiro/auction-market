import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // {product: obj, quantity: num}
  status: 'idle', // 'idle' || 'checking' || 'success' || 'error'
  totalPrice: 0, // total price of the cart
  totalItems: 0, // quantity items of the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const itemFinded = state.items.find(
        (item) => item.product.id === payload.id
      );

      if (itemFinded) {
        itemFinded.quantity++;
      } else {
        state.items.push({ product: payload, quantity: 1 });
      }
    },
    // removeFromCart: (state, { payload }) => {

    //     if (payload.quantity <= 1) {
    //         state.items = state.items.filter((item) => item.product.id !== payload.product.id);
    //     } else {
    //         const itemFinded = state.items.find(item => item.product.id === payload.product.id)
    //         itemFinded.quantity--;
    //     }

    // },
    updateCartQuantity: (state, { payload }) => {
      if (payload.quantity === 0) {
        state.items = state.items.filter(
          (item) => item.product.id !== payload.product.id
        );
        return;
      }

      const itemFinded = state.items.find(
        (item) => item.product.id === payload.product.id
      );
      itemFinded.quantity = payload.quantity;
    },
    // deleteFromCart: (state, { payload }) => {
    //     state.items = state.items.filter((item) => item.product.id !== payload.id);
    // },
    resetCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
      state.status = 'idle';
    },
    setItemsCart: (state, { payload }) => {
      state.items = payload;
    },
    updateCartPrice: (state) => {
      state.totalPrice = state.items
        .reduce(
          (acum, actualValue) =>
            acum + actualValue.product.price * actualValue.quantity,
          0
        )
        .toFixed(2);
    },
    setCartTotalItems: (state) => {
      state.totalItems = state.items.reduce(
        (acum, actualValue) => acum + actualValue.quantity,
        0
      );
    },
    setCartStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const {
  addToCart,
  // removeFromCart,
  updateCartQuantity,
  // deleteFromCart,
  resetCart,
  setItemsCart,
  updateCartPrice,
  setCartTotalItems,
  setCartStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
