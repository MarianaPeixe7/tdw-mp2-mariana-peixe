import { configureStore } from '@reduxjs/toolkit';

const dummy = (state = {}) => state; // reducer vazio para resolver o erro

export default configureStore({
  reducer: {
    dummy
  }
});