import { useState } from 'react'
import View from '../enums/View.ts'
import Setup from './Views/Setup.tsx'
import Display from './Views/Display.tsx'

export default function App() {
  const [view, setView] = useState(View.SETUP)

  return (
    <>
      {view === View.SETUP && <Setup next={() => setView(View.DISPLAY)} />}
      {view === View.DISPLAY && <Display />}
    </>
  )
}

