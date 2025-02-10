// clear the call stack for dfs call
// Do not call the same dfs or bfs if an exisiting alogrithm is running
//

'use client'

import { Cell, Cordinate, CustomStyles, Direction, Position } from '@/types'
import { delay, getRandomIntInclusive, permute } from '@/utils'
import React, { useState, useEffect, useRef } from 'react'

const Colors = {
  start: 'rgb(34, 197, 94)',
  end: 'rgb(239, 68, 68)',
  visited: 'rgb(59, 130, 246)',
}

const customStyles: CustomStyles = {
  main: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDFS: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgb(147, 51, 234)',
  },
  buttonBFS: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgb(79, 70, 229)',
  },
  reset: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgb(174 190 64)',
  },
  input: {
    width: '80px',
    padding: '8px',
    border: '1px solid rgb(204, 204, 204)',
    borderRadius: '4px',
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  grid: { display: 'grid', gap: '1px', justifyItems: 'center' },
}

const directions: Direction = [
  [-1, 0], // top
  [0, 1], // right
  [1, 0], // bottom
  [0, -1], // left
  // [-1, -1], // top left
  // [1, -1], // bottom left
  // [-1, 1], // top right
  // [1, 1], // bottom rigth
]

let blockers = new Set<string>()

const createGrid = (m: number, n: number) => {
  blockers = new Set()

  return Array.from({ length: m }, (_, row) =>
    Array.from({ length: n }, (_, col) => {
      let cell = { row, col, color: 'lightgray' }
      if (row === 0 || col === 0 || row === m - 1 || col === n - 1) return cell

      // let isBlocker = row + col === m - 1
      let isBlocker = getRandomIntInclusive(1, 4) === 1

      if (isBlocker) {
        blockers.add(`${row}_${col}`)
        cell.color = 'black'
      }

      return cell
    })
  )
}
const Matrix: React.FC = () => {
  const allPossibleDirection = permute(directions)
  const [size, setSize] = useState<number>(3)
  const [matrix, setMatrix] = useState<Cell[][]>([[]])
  const [visitOrder, setVisitOrder] = useState<Position | []>([])
  const [startCordinate, setStartCordinate] = useState<Cordinate>({
    x: -1,
    y: -1,
  })
  const [endCordinate, setEndCordinate] = useState<Cordinate>({
    x: -1,
    y: -1,
  })

  const [m, n] = [size || 10, size || 10]

  useEffect(() => {
    setMatrix(createGrid(m, n))
  }, [size])

  const isCordinatesAvilable =
    startCordinate.x === -1 ||
    startCordinate.y === -1 ||
    endCordinate.x === -1 ||
    endCordinate.y === -1

  const shouldStopExecuting = useRef(false)

  const highlightCell = async (
    row: number,
    col: number,
    color = 'lightgray'
  ) => {
    setMatrix((prevMatrix) =>
      prevMatrix.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? { ...cell, color } : cell
        )
      )
    )
    await delay(0)
  }

  const dfs = (startRow: number, startCol: number) => {
    let visited: Set<string> = new Set()

    const dfsHelper = async (row: number, col: number) => {
      if (row === endCordinate.x && col === endCordinate.y) {
        console.log('found')
        return true
      }

      if (
        row < 0 ||
        col < 0 ||
        row >= m ||
        col >= n ||
        visited.has(`${row}_${col}`) ||
        blockers.has(`${row}_${col}`) ||
        shouldStopExecuting.current
      )
        return false

      visited.add(`${row}_${col}`)

      // if (row !== startRow || col !== startCol)
      //   await highlightCell(row, col, 'yellow')
      // else await highlightCell(row, col, 'green')

      setVisitOrder
      const directionIndex = getRandomIntInclusive(
        0,
        allPossibleDirection.length - 1
      )

      // Explore neighbors
      for (const [dr, dc] of allPossibleDirection[directionIndex]) {
        const [nr, nc] = [row + dr, col + dc]
        const isFound = await dfsHelper(nr, nc)
        if (isFound) {
          return true
        }
      }
      return false
    }

    dfsHelper(startRow, startCol)
  }

  const bfs = (): Position[] => {
    const [startRow, startCol] = [startCordinate.x, startCordinate.y]
    const queue: Cell[] = [{ row: startRow, col: startCol }]
    const visitOrder: Position[] = []
    const visited = new Set<string>()

    while (queue.length > 0) {
      const { row, col } = queue.shift()!

      visited.add(`${row}_${col}`)
      visitOrder.push([row, col])

      if (row === endCordinate.x && col === endCordinate.y) break

      const directionIndex = getRandomIntInclusive(
        0,
        allPossibleDirection.length - 1
      )

      // Explore neighbors
      for (const [dr, dc] of directions) {
        // for (const [dr, dc] of allPossibleDirection[directionIndex]) {
        const [nr, nc] = [row + dr, col + dc]
        if (
          nr < 0 ||
          nc < 0 ||
          nr >= m ||
          nc >= n ||
          visited.has(`${nr}_${nc}`) ||
          blockers.has(`${nr}_${nc}`)
        )
          continue

        queue.push({ row: nr, col: nc })
      }
    }

    return visitOrder
  }

  const handleTraversal = async (algorithm: string) => {
    // let visitedOrder = algorithm === 'dfs' ? dfs(1, 2) : bfs()
    let visitedOrder = bfs()

    console.log({ visitedOrder })

    for (let [x, y] of visitedOrder) {
      console.log([x, y])
    }
  }

  const resetMatrix = () => {
    shouldStopExecuting.current = true
    setMatrix(createGrid(m, n))
    setEndCordinate({
      x: -1,
      y: -1,
    })
    setStartCordinate({
      x: -1,
      y: -1,
    })
  }

  const handleCellClick = async (rowIndex: number, colIndex: number) => {
    if (blockers.has(`${rowIndex}_${colIndex}`)) return

    if (startCordinate.x === -1 && startCordinate.y === -1) {
      setStartCordinate({ x: rowIndex, y: +colIndex })
      await highlightCell(rowIndex, colIndex, 'green')
    } else if (endCordinate.x === -1 && endCordinate.y === -1) {
      setEndCordinate({ x: rowIndex, y: +colIndex })
      await highlightCell(rowIndex, colIndex, 'red')
    }
  }

  return (
    <div style={customStyles.main}>
      <h1 style={{ margin: 0 }}>DFS and BFS Visualizer</h1>
      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <input
          type='number'
          value={size}
          min={3}
          max={20}
          onChange={(e) => setSize(Number(e.target.value))}
          style={customStyles.input}
        />
        <button
          style={{
            ...customStyles.buttonDFS,
            ...(isCordinatesAvilable && customStyles.disabledButton),
          }}
          onClick={() => handleTraversal('dfs')}
          disabled={isCordinatesAvilable}
        >
          Run DFS
        </button>
        <button
          style={{
            ...customStyles.buttonBFS,
            ...(isCordinatesAvilable && customStyles.disabledButton),
          }}
          onClick={() => handleTraversal('bfs')}
          disabled={isCordinatesAvilable}
        >
          Run BFS
        </button>
        <button
          style={customStyles.reset}
          onClick={resetMatrix}
        >
          Reset
        </button>
      </div>
      <div
        style={{
          ...customStyles.grid,
          gridTemplateRows: `repeat(${m}, 32px)`,
          gridTemplateColumns: `repeat(${n}, 32px)`,
        }}
      >
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              onClick={() => handleCellClick(rowIndex, colIndex)}
              key={`${rowIndex}-${colIndex}`}
              id={`${rowIndex}_${colIndex}`}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: cell.color,
                margin: 0,
                padding: 0,
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  )
}

export default Matrix
