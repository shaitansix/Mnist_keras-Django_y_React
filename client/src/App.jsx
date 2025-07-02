import { Routes, Route } from 'react-router'
import Base from '@layouts/Base.jsx'
import Home from '@pages/Home.jsx'
import MnistKeras from '@pages/MnistKeras.jsx'
import './App.css'

function App() {
  return (
    <main className = 'app'>
      <Base>
        <Routes>
          <Route path = '/' element = {<Home />}></Route>
          <Route path = '/mnist-keras' element = {<MnistKeras />}></Route>
        </Routes>
      </Base>
    </main>
  )
}

export default App