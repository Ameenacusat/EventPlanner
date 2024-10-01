import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { db } from './Firebase/Firestore';
import {
    Box, 
    Button, 
    ButtonGroup,
    useDisclosure, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    addDoc
  } from 'firebase/firestore';
  import { v4 as uuidv4 } from 'uuid';


const MyEvents = () => {
    const [mapData, setMapData] = useState(null);
    const [error, setError] = useState(null);
    const [mapUuid, setMapUuid] = useState('');
    const [mapTitle, setMapTitle] = useState('');
    const [mapDescription, setMapDescription] = useState('');
   
       
      
        // Function to create a new map
        const createMap = async () => {
          const newMapUuid = uuidv4(); // Generate a new UUID
          const newMapData = {
            slug: newMapUuid,
            title: mapTitle,
            description: mapDescription,
            privacy: "public",
            users_can_create_markers: "yes",
            options: null,
            uuid: newMapUuid,
            // created_at: new Date().toISOString(),
            //updated_at: new Date().toISOString(),
            //image: "/images/new-map.png",
            /*categories: [
              { id: 1, name: "Category 1", icon: "/images/icon1.svg", markers_count: 0 },
            ],*/
          };
      
          try {
            const response = await axios.post('/api/maps', newMapData);
            console.log('Map created successfully:', response.data);
            setMapUuid(newMapUuid); // Store the UUID of the created map
          } catch (error) {
            console.error('Error creating map:', error);
            setError(error);
          }
        };
    
        const fetchMap = async (uuid) => {
            try {
              const response = await axios.get(`/api/maps/${uuid}`);
              setMapData(response.data);
            } catch (error) {
              console.error('Error fetching map:', error);
              setError(error);
            }
          };
        useEffect(() => {
            if (mapUuid) {
              fetchMap(mapUuid);
            }
          }, [mapUuid]);
    const [Events, setEvents] = useState([]);
    const [Name,setName] = useState(null);
    const [Date,setDate] = useState(null);
    //const [error, setError] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    
    const HandleAddEvents = () => {
        onOpen();
    }
    console.log(Events)
    const HandleModalSubmit=()=>{

        //setEvents(value);
        onClose();
        const date = Date.slice(0, 10);  
        console.log(date);
        const time = Date.slice(11,16);
        console.log(time);
        setEvents((prevTexts) => [
            ...prevTexts,
            {
              id:   Events.length + 1,
              Name: Name,
              Date: date,
              Time: time ,
             
            },
          ]);
          createMap()
          
        
        const docRef = collection(db,'Database',`abhishekkrishnan2006@gmail.com`,`${Name}`)
        try {
            addDoc(docRef,{
                Date:date,
                Time:time
            })
          } catch (error) {
            console.log(error)
          }
        
        setName(null);
        setDate(null);
        
    }
   
  return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
    >
        <Box
            h="650px"
            w="100%"
        >
            <Box>
                <img
                    src={mapData?.image}
                >
                </img>
            </Box>
        </Box>
        <Box
            w="100%"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            p="10px"
            pr = "20px" 
        >
            <Button 
                colorScheme='teal' 
                size='md'
                onClick = {HandleAddEvents}

            >
                Add Events
            </Button>
            <Modal
               
                isOpen={isOpen}
                onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Create your Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                <FormLabel>Event Name</FormLabel>
                <Input ref={initialRef} placeholder='First name' onChange={(e)=>setName(e.target.value)}/>
                </FormControl>

                <FormControl mt={4}>
                <FormLabel>Date & Time</FormLabel>
                <Input placeholder='Select Date and Time' size='md' type='datetime-local' onChange={(e)=>{setDate(e.target.value)}}/>
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button 
                    colorScheme='blue' 
                    mr={3}
                    onClick={HandleModalSubmit}
                >

                Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </Box>
       
    </Box>
  )
}

export default MyEvents