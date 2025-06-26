import { useState } from 'react'
import AppRouter from './routes/AppRouter';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppRouter />
  )
}

export default App

