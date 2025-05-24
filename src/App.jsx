import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// ✅ Helper function to prevent negative numbers
function clamp(n) {
  return n < 0 ? 0 : n;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <h3>count is {count}</h3>
        <button onClick={() => setCount(c => clamp(c + 1))}>+</button>
        <button onClick={() => setCount(c => clamp(c - 1))}>-</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
          {console.log(count)}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
