import { useQuery } from "@tanstack/react-query"
import { Card } from "../../../common"
import { getProducts } from "../../../api/motorcycle";
import { Box, SimpleGrid, Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon  } from "@chakra-ui/react";

export const MotorcycleParts = () => {
  const { data, isLoading, error, isError } = useQuery({ queryKey: ['aceites'], queryFn: getProducts })

  if(isLoading){
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    <Box marginTop={20}>
      <Accordion defaultIndex={[0]} allowMultiple>
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
      <AccordionItem>
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
      </Accordion>
    </Box>
    
  )
}
