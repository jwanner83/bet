export default interface Bet {
  amount: number
  name: string
  win?: number | undefined
  return?: number | undefined
  percent?: number | undefined
}