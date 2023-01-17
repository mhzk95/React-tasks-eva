import { useState } from "react"

function App() {
  const[name,setName] = useState('sakeer');

  return (
    <div className='App'>
      {name}
      <span onClick={handleClick}></span>
    </div>
  )
}

export default App
