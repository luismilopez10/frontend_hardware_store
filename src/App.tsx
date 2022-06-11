import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <a href="#" className='button'>Learn more</a>
      </header>

      <BrowserRouter>
      <nav className='flex sm:justify-left space-x-4 p-5 bg-orange-600'>
          <Link to="/provider" className='rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900'>Providers</Link>
          <Link to="/inventory" className='rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900'>Inventory</Link>
          <Link to="/receipt" className='rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900'>Receipts</Link>
          <Link to="/bills" className='rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900'>Bills</Link>
      </nav>
      <Routes>
            {/* <Route path="/" element={<Home />}/>
            <Route path="/provider" element={<Providers />}/>
            <Route path="/inventory" element={<Inventory />}/>
            <Route path="/receipt" element={<Receipts />}/>
            <Route path="/bills" element={<Bills />}/> */}
      </Routes>
    </BrowserRouter>

    </div>
  )
}

export default App
