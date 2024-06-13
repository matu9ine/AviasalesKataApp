import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import { TicketsState } from '@/assets/types/ticketsTypes'

const initialState: TicketsState = {
  tickets: [],
  loading: false,
  error: null,
  token: null,
  stop: false,
}

export const fetchSearchId = createAsyncThunk<string>('tickets/fetchSearchId', async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await response.json()
  return data.searchId
})

export const fetchTickets = createAsyncThunk<TicketsState, string, { rejectValue: string }>(
  'tickets/fetchTickets',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${token}`)
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue('Failed to fetch tickets')
    }
  }
)

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    getAppToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.error = null
      })
      .addCase(fetchSearchId.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload // Сохраняем searchId в состояние
      })
      .addCase(fetchTickets.pending, (state) => {
        state.error = null
        state.loading = true
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<TicketsState>) => {
        state.tickets = state.tickets.concat(action.payload.tickets)
        state.loading = false
        state.stop = action.payload.stop
        if (action.payload.stop) {
          message.success(`Offers(${state.tickets.length}) upload has been successfully completed!`, 3)
        }
      })
      .addCase(fetchTickets.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload
        message.error(
          'One of request was denied by the server with code 500. Fetch error by server. No worry, the download continues!',
          3
        )
      })
  },
})

export const { getAppToken } = ticketsSlice.actions

export default ticketsSlice.reducer
