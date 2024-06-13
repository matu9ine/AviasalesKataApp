import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SortingState } from '@/assets/types/sortingTypes'

const initialState: SortingState = {
  currentSort: 'cheaper',
}

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<'cheaper' | 'faster' | 'optimal'>) => {
      state.currentSort = action.payload
    },
  },
})

export const { setSorting } = sortingSlice.actions
export default sortingSlice.reducer
