import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import MyEvents from './Components/MyEvents'
import Landing from "./Components/Pages/Landing"
import Navbar from './Components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChakraProvider>
          
        <MyEvents/>
      </ChakraProvider>
    </>
  )
}

export default App;
