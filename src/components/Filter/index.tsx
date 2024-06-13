import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSorting } from '@/store/slices/sortingSlice'
import { RootState } from '@/store'

import classes from './Filter.module.scss'

export const Filter: React.FC = () => {
  const sortingState = useSelector((state: RootState) => state.sorting.currentSort)
  const dispatch = useDispatch()
  return (
    <nav className={classes.filter}>
      <button
        className={`${classes.filter__element} ${classes['filter__low-price']} ${sortingState === 'cheaper' ? classes['filter__element--active'] : ''}`}
        type="button"
        onClick={() => dispatch(setSorting('cheaper'))}
        aria-label="Самый дешёвый"
      >
        Самый дешёвый
      </button>
      <button
        className={`${classes.filter__element} ${classes.filter__faster} ${sortingState === 'faster' ? classes['filter__element--active'] : ''}`}
        type="button"
        onClick={() => dispatch(setSorting('faster'))}
        aria-label="Самый быстрый"
      >
        Самый быстрый
      </button>
      <button
        className={`${classes.filter__element} ${classes.filter__optimal} ${sortingState === 'optimal' ? classes['filter__element--active'] : ''}`}
        type="button"
        onClick={() => dispatch(setSorting('optimal'))}
        aria-label="Оптимальный"
      >
        Оптимальный
      </button>
    </nav>
  )
}
