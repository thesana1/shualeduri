import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import React from 'react'


function App() {
 const [count, setCount] = useState(1)
 const [showCartLabel, setShowCartLabel] = useState(false)

  return (
    <div>
      <Header count={count} setCount={setCount} setShowCartLabel={setShowCartLabel} showCartLabel={showCartLabel} />
      <Main count={count} setCount={setCount} setShowCartLabel={setShowCartLabel} />
    </div>
  )
}

export default App
