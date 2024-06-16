import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'

import { Ticket } from '@/components/Ticket'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { fetchSearchId, fetchTickets } from '@/store/slices/ticketsSlice'
import { AppDispatch } from '@/store'

import sort from '../../helperFunctions/sort'
import filter from '../../helperFunctions/filter'

import classes from './TicketList.module.scss'

export const TicketList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { tickets, token, loading, stop } = useTypedSelector((state) => state.tickets)
  const { currentSort } = useTypedSelector((state) => state.sorting)
  const filters = useTypedSelector((state) => state.filters)
  useEffect(() => {
    if (!token) {
      dispatch(fetchSearchId())
    }
  }, [token])
  useEffect(() => {
    if (token && !stop && !loading) {
      dispatch(fetchTickets(token))
    }
  }, [token, stop, loading])
  const [count, setCount] = useState(5)
  const sortedTickets = sort([...tickets], currentSort)
  const filteredTickets = useMemo(() => filter(sortedTickets || [], filters), [sortedTickets, filters])
  function renderTickets() {
    if (filteredTickets.length) {
      return filteredTickets.map((ticket, i) => {
        if (i >= count) return null
        return (
          <Ticket
            data={ticket}
            key={`${ticket.segments[0].origin}-${ticket.segments[1].destination}-${ticket.segments[1].date}-${Math.random()}`}
          />
        )
      })
    }
    if (Object.values(filters).every((value) => value === false)) {
      return 'Ни один из фильтров не активен.'
    }
    if (!stop) {
      return 'Ожидайте окончания поиска'
    }
    return 'Билетов по заданным параметрам не найдено.'
  }
  return (
    <ul className={classes.tickets}>
      {!stop && <Spin className={classes.tickets__loading} />}
      {renderTickets()}
      {filteredTickets.length > count ? (
        <button
          className={`${classes.tickets__button} ${classes.button}`}
          type="button"
          onClick={() => setCount((prevCount) => prevCount + 5)}
        >
          Показать еще 5 билетов!
        </button>
      ) : null}
    </ul>
  )
}
