import { atom } from 'jotai'
import Bet from '../interface/Bet.ts'

export const WonPersonAtom = atom<'one' | 'two'>()