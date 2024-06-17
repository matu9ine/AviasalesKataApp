// slices/filtersSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FiltersState {
  all: boolean
  none: boolean
  one: boolean
  two: boolean
  three: boolean
}

const initialState: FiltersState = {
  all: false,
  none: false,
  one: false,
  two: false,
  three: false,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAll: (state, action: PayloadAction<boolean>) => {
      state.all = action.payload
    },
    setSpecific: (state, action: PayloadAction<{ filter: keyof FiltersState; checked: boolean }>) => {
      state[action.payload.filter] = action.payload.checked
    },
  },
})

export const { setAll, setSpecific } = filtersSlice.actions
export default filtersSlice.reducer
