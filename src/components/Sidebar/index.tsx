import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '@/store'
import { setAll, setSpecific } from '@/store/slices/filtersSlice'

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
  const filters = useSelector((state: RootState) => state.filters)
  const dispatch = useDispatch()

  const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAll(event.target.checked))
  }

  const handleSpecificChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterKey = event.target.id as keyof typeof filters
    dispatch(setSpecific({ filter: filterKey, checked: event.target.checked }))
  }

  return (
    <aside className={classes.sidebar}>
      <h3>Количество пересадок</h3>
      <form>
        {Object.entries(filters).map(([key, value]) => (
          <label htmlFor={key} key={key}>
            <input
              className={`${classes.input} ${classes['input--visually-hidden']}`}
              type="checkbox"
              id={key}
              checked={value}
              onChange={key === 'all' ? handleAllChange : handleSpecificChange}
            />
            <span className={`${classes.checker}`} />
            {filterLabels[key as FilterKey]}
          </label>
        ))}
      </form>
    </aside>
  )
}
