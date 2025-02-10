'use client'
import React, { useState, useEffect } from 'react'

type CellType = 'unvisited' | 'start' | 'end'
type Position = [number, number] | null
type Matrix = CellType[][]

const MatrixPathfinding: React.FC = () => {
  const [size, setSize] = useState<number>(10)
  const [matrix, setMatrix] = useState<Matrix>([])
  const [startPos, setStartPos] = useState<Position>(null)
  const [endPos, setEndPos] = useState<Position>(null)
  const [isSelecting, setIsSelecting] = useState<'start' | 'end'>('start')
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)
  const [visitedOrder, setVisitedOrder] = useState<Position[]>([])

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    controls: {
      marginBottom: '20px',
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    },
    input: {
      width: '80px',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      color: 'white',
      fontWeight: 'bold',
    },
    dfsButton: {
      backgroundColor: '#9333ea',
    },
    bfsButton: {
      backgroundColor: '#4f46e5',
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    grid: {
      display: 'inline-block',
      border: '1px solid #ccc',
    },
    row: {
      display: 'flex',
    },
    cell: {
      width: '32px',
      height: '32px',
      border: '1px solid #ccc',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    message: {
      marginTop: '10px',
      fontSize: '14px',
      color: '#666',
    },
  }

  useEffect(() => {
    const newMatrix: Matrix = Array(size)
      .fill(null)
      .map(() => Array(size).fill('unvisited'))
    setMatrix(newMatrix)
    setStartPos(null)
    setEndPos(null)
    setVisitedOrder([])
  }, [size])

  const dfs = (): Position[] => {
    if (!startPos || !endPos) return []

    const visited = new Set<string>()
    const visitOrder: Position[] = []

    const dfsHelper = (row: number, col: number): boolean => {
      const key = `${row},${col}`
      if (row < 0 || row >= size || col < 0 || col >= size || visited.has(key))
        return false

      visited.add(key)
      visitOrder.push([row, col])

      if (row === endPos[0] && col === endPos[1]) return true

      const directions: [number, number][] = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]

      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc
        if (dfsHelper(newRow, newCol)) {
          return true
        }
      }

      return false
    }

    dfsHelper(startPos[0], startPos[1])
    return visitOrder
  }

  const bfs = (): Position[] => {
    if (!startPos || !endPos) return []

    const visited = new Set<string>()
    const queue: Position[] = [[startPos[0], startPos[1]]]
    const visitOrder: Position[] = []

    while (queue.length > 0) {
      const pos = queue.shift()
      if (!pos) continue
      const [row, col] = pos
      const key = `${row},${col}`

      if (row < 0 || row >= size || col < 0 || col >= size || visited.has(key))
        continue

      visited.add(key)
      visitOrder.push([row, col])

      if (row === endPos[0] && col === endPos[1]) break

      const directions: [number, number][] = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]

      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc
        if (
          newRow >= 0 &&
          newRow < size &&
          newCol >= 0 &&
          newCol < size &&
          !visited.has(`${newRow},${newCol}`)
        ) {
          queue.push([newRow, newCol])
        }
      }
    }

    return visitOrder
  }

  const visualize = async (algorithm: 'dfs' | 'bfs') => {
    setIsVisualizing(true)
    const order = algorithm === 'dfs' ? dfs() : bfs()
    setVisitedOrder([])

    for (let i = 0; i < order.length; i++) {
      console.log('🚀 ~ visualize ~ order:', { matrix, visitedOrder })
      await new Promise((resolve) => setTimeout(resolve, 10000))
      setVisitedOrder((prev) => [...prev, order[i]])
    }

    setIsVisualizing(false)
  }

  const handleCellClick = (row: number, col: number) => {
    if (isVisualizing) return

    const newMatrix = [...matrix]
    if (isSelecting === 'start') {
      if (startPos) {
        newMatrix[startPos[0]][startPos[1]] = 'unvisited'
      }
      newMatrix[row][col] = 'start'
      setStartPos([row, col])
      setIsSelecting('end')
    } else {
      if (endPos) {
        newMatrix[endPos[0]][endPos[1]] = 'unvisited'
      }
      newMatrix[row][col] = 'end'
      setEndPos([row, col])
      setIsSelecting('start')
    }
    setMatrix(newMatrix)
  }

  const getCellStyle = (row: number, col: number): React.CSSProperties => {
    const baseStyle = { ...styles.cell }

    if (startPos && row === startPos[0] && col === startPos[1]) {
      return { ...baseStyle, backgroundColor: '#22c55e' }
    }
    if (endPos && row === endPos[0] && col === endPos[1]) {
      return { ...baseStyle, backgroundColor: '#ef4444' }
    }
    if (visitedOrder.some(([r, c]) => r === row && c === col)) {
      return { ...baseStyle, backgroundColor: '#3b82f6' }
    }
    return { ...baseStyle, backgroundColor: '#e5e7eb' }
  }

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <input
          type='number'
          value={size}
          min={5}
          max={20}
          onChange={(e) => setSize(Number(e.target.value))}
          style={styles.input}
        />
        <button
          onClick={() => visualize('dfs')}
          disabled={!startPos || !endPos || isVisualizing}
          style={{
            ...styles.button,
            ...styles.dfsButton,
            ...((!startPos || !endPos || isVisualizing) &&
              styles.disabledButton),
          }}
        >
          Run DFS
        </button>
        <button
          onClick={() => visualize('bfs')}
          disabled={!startPos || !endPos || isVisualizing}
          style={{
            ...styles.button,
            ...styles.bfsButton,
            ...((!startPos || !endPos || isVisualizing) &&
              styles.disabledButton),
          }}
        >
          Run BFS
        </button>
      </div>

      <div style={styles.grid}>
        {matrix.map((row, rowIdx) => (
          <div
            key={rowIdx}
            style={styles.row}
          >
            {row.map((_, colIdx) => (
              <div
                key={colIdx}
                style={getCellStyle(rowIdx, colIdx)}
                onClick={() => handleCellClick(rowIdx, colIdx)}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={styles.message}>
        {isSelecting === 'start'
          ? 'Select start position'
          : 'Select end position'}
      </div>
    </div>
  )
}

export default MatrixPathfinding
