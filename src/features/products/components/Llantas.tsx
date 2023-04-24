import { useQuery } from "@tanstack/react-query"
import { Box, SimpleGrid, Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon  } from "@chakra-ui/react";
import { Card } from "../../../common"
import { getLlantas } from "../../../api/motorcycle";

export const Llantas = () => {
  const { data, isLoading, error, isError } = useQuery({ queryKey: ['llantas'], queryFn: getLlantas })

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
              <Heading>LLANTAS</Heading>
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
  )
}
