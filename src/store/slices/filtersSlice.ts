import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FiltersState } from '@/assets/types/filtersTypes'

const initialState: FiltersState = {
  filter: 'all',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'none' | 'one' | 'two' | 'three'>) => {
      state.filter = action.payload
    },
  },
})

export const { setFilter } = filtersSlice.actions
export default filtersSlice.reducer
