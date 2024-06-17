import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FilterKey = 'all' | 'none' | 'one' | 'two' | 'three'

interface FiltersState {
  selectedFilter: FilterKey
}

const initialState: FiltersState = {
  selectedFilter: 'all',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterKey>) {
      state.selectedFilter = action.payload
    },
  },
})

export const { setFilter } = filtersSlice.actions

export default filtersSlice.reducer
