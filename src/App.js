import Paypal from './Paypal'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Success from './Success'
import PaypalClass from './PaypalClass'

// import PaypalClass from './PaypalClass'

function App() {
  return (
    <div className='App'>
      <Routes >
        <Route path='/paypal' element={<PaypalClass />} />
        <Route path='/success' element={<Success />} />
      {/* <Paypal /> */}
      </Routes>
      {/* <PaypalClass /> */}
    </div>
  )
}

export default App
