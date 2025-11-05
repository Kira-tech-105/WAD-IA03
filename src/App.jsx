import { useState } from 'react'
import SumCalculator from './components/SumCalculator';
import './App.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const [count, setCount] = useState(0)

   return (
    <div className="App">
      <SumCalculator />
    </div>
  );
}

export default App



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
