// import { TicketAction, TicketState, TicketActionTypes } from '@/types/ticketsTypes.ts'
//
// const initialState: TicketState = {
//   tickets: [],
//   loading: false,
//   error: null,
// }
// export const ticketReducer = (state: TicketState = initialState, action: TicketAction): TicketState => {
//   switch (action.type) {
//     case TicketActionTypes.FETCH_TICKETS:
//       return { ...state, loading: true, error: null, tickets: [] }
//     case TicketActionTypes.FETCH_TICKETS_SUCCESS:
//       return { ...state, loading: false, error: null, tickets: action.payload }
//     case TicketActionTypes.FETCH_TICKETS_ERROR:
//       return { ...state, loading: false, error: action.payload, tickets: [] }
//     default:
//       return state
//   }
// }
