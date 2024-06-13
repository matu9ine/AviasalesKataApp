export interface Ticket {
  price: number
  carrier: string
  segments: [
    {
      origin: string
      destination: string
      date: string
      stops: string[]
      duration: number
    },
    {
      origin: string
      destination: string
      date: string
      stops: string[]
      duration: number
    },
  ]
}
export interface TicketsState {
  tickets: Ticket[]
  loading: boolean
  error: null | string | undefined
  token: null | string
  stop: boolean
}

export interface FetchError {
  message: string
}

// export enum TicketActionTypes {
//   FETCH_TICKETS = 'FETCH_TICKETS',
//   FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS',
//   FETCH_TICKETS_ERROR = 'FETCH_TICKETS_ERROR',
// }
//
// interface FetchTicketAction {
//   type: TicketActionTypes.FETCH_TICKETS
// }
// interface FetchTicketSuccessAction {
//   type: TicketActionTypes.FETCH_TICKETS_SUCCESS
//   payload: string[]
// }
// interface FetchTicketErrorAction {
//   type: TicketActionTypes.FETCH_TICKETS_ERROR
//   payload: string
// }

// interface TicketAction { не трогать
//   type: string;
//   payload?: any;
// }

// export type TicketAction = FetchTicketAction | FetchTicketErrorAction | FetchTicketSuccessAction
