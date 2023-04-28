import { Box, SimpleGrid, Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon  } from "@chakra-ui/react";
import { Card } from "../../../common"
import { useGetLlantas } from "../hooks";
import { PRODUCT } from "../../../constants";
import { FormProducto } from "../domain";
import { ElementArgs } from "../../../interfaces";

interface LlantasProps {
  edit?: boolean;
}

export const Llantas = ({edit}: LlantasProps) => {
  console.log("Componente Llantas")
  const {data, isError, isLoading} = useGetLlantas();
  
  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    <>
      {/* <AccordionItem marginBottom={10}>
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
            <FormProducto variant={PRODUCT.llanta} />
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' >
              {
                data.map((element: ElementArgs)=>(
                  <Card 
                    key={element.id} 
                    id={ element.id }
                    variant={PRODUCT.llanta}
                    descripcion={element.descripcion}
                    marca={element.marca} 
                    imagen={element.imagen} 
                    precio={element.precio}
                    stock={element.stock}
                  />
                ))
              }
            </SimpleGrid>
          </AccordionPanel>
      </AccordionItem> */}
      <Box bg={'brand.clonika.blue.800'} marginTop={20} padding={4}>
        <FormProducto variant={PRODUCT.llanta} />
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' >
          {
            data.map((element: ElementArgs)=>(
              <Card 
                key={element.id} 
                id={ element.id }
                variant={PRODUCT.llanta}
                descripcion={element.descripcion}
                marca={element.marca} 
                imagen={element.imagen} 
                precio={element.precio}
                stock={element.stock}
              />
            ))
          }
        </SimpleGrid>
      </Box>
    </>
  )
}
