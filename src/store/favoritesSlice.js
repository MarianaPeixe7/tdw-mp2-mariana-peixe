import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
} //tenta carregar os favs do local storage, se nao existir o array fica vazio

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const exists = state.items.find((p) => p.title === action.payload.title) //vê se poema ja existe para nao haver duplicados
      if (!exists) state.items.push(action.payload)
      localStorage.setItem('favorites', JSON.stringify(state.items)) //atualiza local storage
    },
    removeFavorite(state, action) {
      state.items = state.items.filter((p) => p.title !== action.payload.title)
      localStorage.setItem('favorites', JSON.stringify(state.items)) //atualiza local storage
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions //export das actions para os componentes as poderem usar
export default favoritesSlice.reducer //reducer exportado para ser combinado na store.js