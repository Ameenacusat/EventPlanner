import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import MyEvents from './Components/MyEvents'
import Landing from "./Components/Pages/Landing"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChakraProvider>
        <Landing/>
        <MyEvents/>
      </ChakraProvider>
    </>
  )
}

export default App;
