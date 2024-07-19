// store.js
import { configureStore } from '@reduxjs/toolkit';
import keyReducer from './key';
const store = configureStore({
  reducer: {
    key: keyReducer
  },
});

export default store;
