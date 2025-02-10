'use client'
import React, { createContext, useReducer } from 'react'
import todosReducer from '../reducers/todosReducer'

export const TodosContext = createContext()

export const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, {
    todos: [],
    loading: false,
    error: null,
  })

  return (
    <TodosContext.Provider value={{ state, dispatch }}></TodosContext.Provider>
  )
}

// create the context using createContext()
// export the context
// wrapp the app using provider which is available through createContext
// set the value prop which will act as global state object
// import the context from step 2 and use it useContext hook
// the useContext return will contain all the values which are set in the value prop in step 4
