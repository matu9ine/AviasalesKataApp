import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'

import { Ticket } from '@/components/Ticket'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { fetchSearchId, fetchTickets } from '@/store/slices/ticketsSlice'
import { AppDispatch } from '@/store'
import { FiltersState } from '@/assets/types/filtersTypes'

import sort from '../../helperFunctions/sort'
import filter from '../../helperFunctions/filter'

import classes from './TicketList.module.scss'

export const TicketList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { tickets, token, loading, stop } = useTypedSelector((state) => state.tickets)
  const { currentSort } = useTypedSelector((state) => state.sorting)
  const filters = useTypedSelector((state) => state.filters) as unknown as FiltersState

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

  // Сортируем и фильтруем билеты
  const sortedTickets = sort([...tickets], currentSort)
  const filteredTickets = useMemo(() => filter(sortedTickets || [], filters), [sortedTickets, filters])

  function renderTickets() {
    if (filteredTickets.length) {
      return filteredTickets
        .slice(0, count)
        .map((ticket) => (
          <Ticket
            key={`${ticket.segments[0].origin}-${ticket.segments[1].destination}-${ticket.segments[1].date}-${Math.random()}`}
            data={ticket}
          />
        ))
    }

    if (!stop && !loading) {
      return <div>Ожидайте окончания поиска...</div>
    }

    return <div>Билетов по заданным параметрам не найдено.</div>
  }

  return (
    <ul className={classes.tickets}>
      {loading && <Spin className={classes.tickets__loading} />}
      {renderTickets()}
      {filteredTickets.length > count && (
        <button
          className={`${classes.tickets__button} ${classes.button}`}
          type="button"
          onClick={() => setCount((prevCount) => prevCount + 5)}
        >
          Показать еще 5 билетов!
        </button>
      )}
    </ul>
  )
}
