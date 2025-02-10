export const fetchData = async () => {
  dispatch(fetchTodosRequest())
  try {
    const todos = await getTodos()
    dispatch(fetchTodosSuccess(todos))
  } catch (error) {
    dispatch(fetchTodosFailure(error))
  }
}

export const getTodos = async () => {
  const response = await fetch('https://dummyjson.com/todos')
  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }
  return await response.json()
}
