import React, { useEffect } from "react";
import { 
    Box,
    Button,
    textDecoration
 } from "@chakra-ui/react";
import { useState } from "react";
import './Navabar.css'
import martini from './Pages/martini.jpg'

const Navbar = () => {
 

  return(
    <div>
      <Box 
        w="100%" 
        h="85px" 
        bgColor="black"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box
        w="50%"
        p="3"
        display="flex"
        flexDirection="row"
        justifyContent="flex-start">
        <img src={martini} />
        </Box>
        <Box
        w="50%"
        mt="1"
        p="5"
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        >
         <Button colorScheme='gray' >Get Started</Button>


        </Box>

      </Box>
    </div>

  )
    
};

export default Navbar;
