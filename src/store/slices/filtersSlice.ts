import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FiltersState } from '@/assets/types/filtersTypes'

const initialState: FiltersState = {
  all: false,
  none: true,
  one: false,
  two: false,
  three: false,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAll: (state, action: PayloadAction<boolean>) => {
      const checked = action.payload
      state.all = checked
      state.none = checked
      state.one = checked
      state.two = checked
      state.three = checked
    },
    setSpecific: (state, action: PayloadAction<{ filter: keyof FiltersState; checked: boolean }>) => {
      const { filter, checked } = action.payload
      state[filter] = checked
      // Если галочка "Все" была включена и снимается любая другая - отключаем "Все"
      if (state.all && !checked) {
        state.all = false
      } else if (!state.all && state.none && state.one && state.two && state.three) {
        // Если все галочки установлены, кроме "Все" - включаем "Все"
        state.all = true
      }
    },
  },
})

export const { setAll, setSpecific } = filtersSlice.actions
export default filtersSlice.reducer
