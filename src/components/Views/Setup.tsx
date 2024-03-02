import { FormEvent } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { BetsOnPersonOneAtom } from '../../atoms/BetsOnPersonOneAtom.ts'
import Box from '../Common/Box.tsx'
import Button from '../Common/Forms/Button.tsx'
import { CalculatorIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { BetsOnPersonTwoAtom } from '../../atoms/BetsOnPersonTwoAtom.ts'
import Bet from '../../interface/Bet.ts'
import { WonPersonAtom } from '../../atoms/WonPersonAtom.ts'

interface Props {
  next: () => void
}

export default function Setup({ next }: Props) {
  const [betsOne, setBetsOne] = useAtom(BetsOnPersonOneAtom)
  const [betsTwo, setBetsTwo] = useAtom(BetsOnPersonTwoAtom)
  const setWonPerson = useSetAtom(WonPersonAtom)

  const add = (event: FormEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & HTMLFormElement & {
      name: {
        value: string
      }
      amount: {
        value: number
      }
      select: {
        value: 'one' | 'two'
      }
    }

    const bet = {
      name: target.name.value,
      amount: Number(target.amount.value)
    }

    if (target.select.value === 'one') {
      setBetsOne([...betsOne, bet])
    } else {
      setBetsTwo([...betsTwo, bet])
    }

    target.reset()
  }

  const remove = (bet: Bet, key: 'one' | 'two') => {
    let bets

    if (key === 'one') {
      bets = betsOne
    } else {
      bets = betsTwo
    }
    const filtered = bets.filter(b => b.name !== bet.name)

    if (key === 'one') {
      setBetsOne(filtered)
    } else {
      setBetsTwo(filtered)
    }
  }

  const back = (won: 'one' | 'two') => {
    setWonPerson(won)
    next()
  }

  return <div className="h-full">
    <Box width="small" className="relative">
      <div className="pt-24 mb-20">
        <h1 className="text-8xl text-white">Bet.</h1>
        <p className="text-white/70 mt-2">Calculate betting.</p>
      </div>

      <form onSubmit={add}>
        <h3 className="text-white font-bold mb-3">
          Add bets
        </h3>

        <div className="flex gap-3">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="w-full appearance-none bg-form-background text-white text-sm px-3 py-2 rounded-xl border-form-border border focus:bg-form-background-focus focus:border-form-border-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            className="w-full appearance-none bg-form-background text-white text-sm px-3 py-2 rounded-xl border-form-border border focus:bg-form-background-focus focus:border-form-border-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          />
          <select
            defaultValue="select"
            name="select"
            className="w-full appearance-none bg-form-background text-white text-sm px-3 py-2 rounded-xl border-form-border border focus:bg-form-background-focus focus:border-form-border-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            <option value="select" disabled>
              Select
            </option>
            <option value="one">
              One
            </option>
            <option value="two">
              Two
            </option>
          </select>
          <Button type="submit" className="flex items-center gap-2 font-bold">Add<PlusIcon
            className="w-5 h-5"/></Button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-white font-bold mb-3">
          Bets on player one
        </h3>

        {betsOne.length === 0 &&
            <div className="px-4 py-3 text-sm bg-form-background-focus text-white/60 rounded-xl w-full">
                no bets on player one yet
            </div>}

        <div className="flex flex-col gap-2 mb-8">
          {betsOne.map(bet => <div key={bet.name} className="flex gap-2 items-center">
            <div className="px-4 py-3 text-sm bg-form-background-focus text-white rounded-xl w-full">
              {bet.name}
            </div>
            <div className="px-4 py-3 text-sm bg-form-background-focus text-white rounded-xl">
              {bet.amount}
            </div>
            <Button type="submit"
                    className="bg-delete border-none text-red-500 h-[44px] w-[44px] px-4 py-4 flex items-center gap-2 font-bold text-sm"
                    onClick={() => remove(bet, 'one')}><TrashIcon
              className="w-5 h-5"/></Button>
          </div>)}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-white font-bold mb-3">
          Bets on player two
        </h3>

        {betsTwo.length === 0 &&
            <div className="px-4 py-3 text-sm bg-form-background-focus text-white/60 rounded-xl w-full">
                no bets on player two yet
            </div>}

        <div className="flex flex-col gap-2 mb-8">
          {betsTwo.map(bet => <div key={bet.name} className="flex gap-2 items-center">
            <div className="px-4 py-3 text-sm bg-form-background-focus text-white rounded-xl w-full">
              {bet.name}
            </div>
            <div className="px-4 py-3 text-sm bg-form-background-focus text-white rounded-xl">
              {bet.amount}
            </div>
            <Button type="submit"
                    className="bg-delete border-none text-red-500 h-[44px] w-[44px] px-4 py-4 flex items-center gap-2 font-bold text-sm"
                    onClick={() => remove(bet, 'two')}><TrashIcon
              className="w-5 h-5"/></Button>
          </div>)}
        </div>
      </div>

      <div className="flex gap-3 pb-12">
        <Button type="submit" className="w-full flex items-center justify-between gap-2 font-bold" onClick={() => back('one')}>Player one<CalculatorIcon className="w-5 h-5"/></Button>
        <Button type="submit" className="w-full flex items-center justify-between gap-2 font-bold" onClick={() => back('two')}>Player two<CalculatorIcon className="w-5 h-5"/></Button>
      </div>
    </Box>
  </div>
}