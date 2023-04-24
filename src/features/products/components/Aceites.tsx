import { Box, SimpleGrid, Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Button, FormControl, FormLabel, Input  } from "@chakra-ui/react";
import { Card } from "../../../common"
import { FormProducto } from "../domain";
import { useGetAceites } from "../hooks";
import { useEffect } from "react";

export const Aceites = () => {
  const {data, isError, isLoading} = useGetAceites();

  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    <AccordionItem marginBottom={10}>
        <h2>
          <AccordionButton 
            bg={'brand.clonika.blue.800'} 
            color={'white'}
            _hover={{
              bg: 'brand.clonika.blue.500',
              color: 'white',
            }}
          >
            <Box as="span" flex='1' textAlign='center'>
              <Heading>ACEITES</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} bg={'brand.clonika.blue.800'}>
          <FormProducto variant='aceite'/>
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' >
            {
              data.map((element: any)=>(
                <Card 
                  key={element.id} 
                  marca={element.marca} 
                  cantidad={element.cantidad} 
                  imagen={element.imagen} 
                  precio={element.precio}
                  stock={element.stock}
                />
              ))
            }
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
  )
}
