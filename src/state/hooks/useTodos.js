import { useContext } from 'react'
import { TodosContext } from '../contexts/TodosContext'

const useTodos = () => {
  try {
    const context = useContext(TodosContext)
    // Return default values if context is undefined (happens during SSR)
    if (!context) {
      return [{ loading: false, error: null, todos: [] }, () => {}]
    }
    return [context.state, context.dispatch]
  } catch (error) {
    // Fallback for SSR
    return [{ loading: false, error: null, todos: [] }, () => {}]
  }
}

export default useTodos
