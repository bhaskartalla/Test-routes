export type Cell = {
  row: number
  col: number
  color?: string
}
export type Position = [number, number]

export type Direction = Position[]

export type Cordinate = { x: number; y: number }

export type CustomStyles = {
  [key: string]: React.CSSProperties
}
