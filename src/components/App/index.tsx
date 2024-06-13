import { createRoot } from 'react-dom/client'
import React, { StrictMode } from 'react'
import { Provider } from 'react-redux'

import { Sidebar, Filter, TicketList, Header } from '@/components'
import store from '@/store'

import classes from './App.module.scss'

const App: React.FC = () => {
  return (
    <div className={classes.App}>
      <div className={classes.app_wrapper}>
        <Header />
        <main className={classes.main}>
          <Sidebar />
          <Filter />
          <TicketList />
        </main>
      </div>
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!) // используем Non-null assertion operator (!) для указания, что элемент существует
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
