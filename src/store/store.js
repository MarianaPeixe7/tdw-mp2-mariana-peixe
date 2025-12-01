import { configureStore } from '@reduxjs/toolkit'
import { poetryApi } from '../api/poetryApi'
import favoritesReducer from './favoritesSlice'

export default configureStore({
  reducer: {
    [poetryApi.reducerPath]: poetryApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(poetryApi.middleware),
})