import { Direction } from '@/types'

export function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

export function permute(arr: Direction): Direction[] {
  let res: Direction[] = []
  function dfs(l: number, r: number) {
    if (l === r) {
      res.push([...arr])
      return
    }

    for (let i = l; i <= r; i++) {
      ;[arr[i], arr[l]] = [arr[l], arr[i]]
      dfs(l + 1, r)
      ;[arr[i], arr[l]] = [arr[l], arr[i]]
    }
  }

  dfs(0, arr.length - 1)

  return res
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
