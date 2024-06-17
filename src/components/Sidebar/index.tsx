import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '@/store'
import { setFilter } from '@/store/slices/filtersSlice' // Имя действия может измениться в зависимости от вашей реализации

import classes from './Sidebar.module.scss'

type FilterKey = 'all' | 'none' | 'one' | 'two' | 'three'

const filterLabels: Record<FilterKey, string> = {
  all: 'Все',
  none: 'Без пересадок',
  one: '1 пересадка',
  two: '2 пересадки',
  three: '3 пересадки',
}

export const Sidebar: React.FC = () => {
  const selectedFilter = useSelector((state: RootState) => state.filters.selectedFilter)
  const dispatch = useDispatch()

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterKey = event.target.value as FilterKey
    dispatch(setFilter(filterKey))
  }

  return (
    <aside className={classes.sidebar}>
      <h3>Количество пересадок</h3>
      <form>
        {Object.entries(filterLabels).map(([key, label]) => (
          <label htmlFor={key} key={key}>
            <input
              className={`${classes.input} ${classes['input--visually-hidden']}`}
              type="radio"
              id={key}
              value={key}
              checked={selectedFilter === key}
              onChange={handleFilterChange}
            />
            <span className={`${classes.checker}`} />
            {label}
          </label>
        ))}
      </form>
    </aside>
  )
}
