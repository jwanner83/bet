import { useAtomValue } from 'jotai'
import { BetsOnPersonOneAtom } from '../../atoms/BetsOnPersonOneAtom.ts'
import { BetsOnPersonTwoAtom } from '../../atoms/BetsOnPersonTwoAtom.ts'
import { WonPersonAtom } from '../../atoms/WonPersonAtom.ts'
import { useEffect, useState } from 'react'
import Bet from '../../interface/Bet.ts'

export default function Display () {
  const betsOne = useAtomValue(BetsOnPersonOneAtom)
  const betsTwo = useAtomValue(BetsOnPersonTwoAtom)
  const won = useAtomValue(WonPersonAtom)

  const [bets, setBets] = useState<Bet[]>([])
  const [totalLoss, setTotalLoss] = useState<number>(0)
  const [totalWonInvest, setTotalWonInvest] = useState<number>(0)

  useEffect(() => {
    if (!won) return

    let loss: number
    let totalWonInvest: number
    let betsWon: Bet[]

    if (won === 'one') {
      betsWon = betsOne
      loss = betsTwo.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      )
      setTotalLoss(loss)
      totalWonInvest = betsOne.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      )
      setTotalWonInvest(totalWonInvest)
    } else {
      betsWon = betsTwo
      loss = betsOne.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      )
      setTotalLoss(loss)
      totalWonInvest = betsTwo.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0,
      )
      setTotalWonInvest(totalWonInvest)
    }

    let bets: Bet[] = []

    for (const betsWonElement of betsWon) {
      // get percentage of current bet in comparison of total invest
      const percentage = betsWonElement.amount / totalWonInvest * 100
      const win = loss / 100 * percentage

      bets.push({
        ...betsWonElement,
        percent: Math.floor(percentage),
        win: Math.floor(win),
        return: Math.floor(win + betsWonElement.amount),
      })
    }

    setBets(bets)
  }, [won, betsOne, betsTwo])

  return <>

    <div className="px-12 pt-12">
      <div className="px-5 py-4 text-sm bg-form-background-focus text-white rounded-xl w-full">
        <h2 className="text-2xl font-bold text-white mb-3">
          Player {won} won
        </h2>

        <p className="">
          Total loss {totalLoss}<br/>
          Total won invest {totalWonInvest}
        </p>
      </div>
    </div>

    <div className="p-12 grid grid-cols-3 gap-8">
    {bets.map(bet => <div className="px-5 py-4 text-sm bg-form-background-focus text-white rounded-xl w-full">
      <h2 className="text-2xl font-bold text-white mb-3">
        {bet.name}
      </h2>

      <p className="mb-3">
        Invest {bet.amount}<br />
      </p>

      <p className="">
        {bet.name} invested {bet.amount}, which is {bet.percent}% of the total invest. {bet.name} will get {bet.win} plus his invest of {bet.amount} back which is a total of {bet.return}.
      </p>

      <p className="mt-3 text-lg">
        Return {bet.return}
      </p>
    </div>)}
  </div>
  </>
}