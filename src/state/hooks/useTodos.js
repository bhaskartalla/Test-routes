import { useContext } from 'react'
import { TodosContext } from '../contexts/TodosContext'

const useTodos = () => {
  const { state, dispatch } = useContext(TodosContext)
  return [state, dispatch]
}

export default useTodos
