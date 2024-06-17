import { configureStore } from '@reduxjs/toolkit'

import ticketsReducer from '@/store/slices/ticketsSlice'
import filtersReducer from '@/store/slices/filtersSlice'
import sortingReducer from '@/store/slices/sortingSlice'

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tickets: ticketsReducer,
    sorting: sortingReducer,
  },
})

// Определение типа RootState из состояния reducer'ов
export type RootState = ReturnType<typeof store.getState>

export default store
export type AppDispatch = typeof store.dispatch
