'use client'
import { useEffect, useState } from 'react'

type UseArrayActions<T> = {
  push: (item: T) => void
  removeByIndex: (index: number) => void
}

export function useArray<T>(
  initialValue: T[]
): { value: T[] } & UseArrayActions<T> {
  const [value, setValue] = useState<T[]>(initialValue)
  const push = (el: T) => {
    setValue((prev) => [...prev, el])
  }
  const removeByIndex = (i: number) => {
    setValue((prev) => prev.filter((ele, ind) => ind !== i))
  }

  return { value, push, removeByIndex }
}

const About = () => {
  const [count, setCount] = useState(1)
  const { value, push, removeByIndex } = useArray([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ])

  const handleCount = () => {
    setCount(count + 1)
    push(count)

    removeByIndex(3)
  }

  useEffect(() => {
    console.log(value)
  }, [value])

  return <div onClick={handleCount}>Hello World:{count}</div>
}

export default About
