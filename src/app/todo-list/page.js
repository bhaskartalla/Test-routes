'use client'
import React, { useEffect, useState } from 'react'
import useTodos from '../../state/hooks/useTodos'
import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
} from '../../state/actions/todosActions'
import { getTodos } from '../../services/todosService'

const TodoList = () => {
  const [state, dispatch] = useTodos()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchTodosRequest())
      try {
        const todos = await getTodos()
        dispatch(fetchTodosSuccess(todos))
      } catch (error) {
        dispatch(fetchTodosFailure(error))
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Todo List</h2>
      {state.loading ? (
        <p>Loading...</p>
      ) : state.error ? (
        <p>Error: {state.error.message}</p>
      ) : (
        <div>
          {state.todos.map((todo) => (
            <li key={todo.id}>{todo.todo}</li>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList
