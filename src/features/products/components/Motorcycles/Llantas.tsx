import { Box, SimpleGrid, Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon  } from "@chakra-ui/react";
import { CustomCard } from "../../../../common"
import { useGetLlantas } from "../../hooks";
import { PRODUCT } from "../../../../constants";
import { FormProducto } from "../../domain";
import { ElementArgs } from "../../../../interfaces";

interface LlantasProps {
  edit?: boolean;
}

export const Llantas = ({edit}: LlantasProps) => {
  const {data, isError, isLoading} = useGetLlantas();
  
  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    <>
      
      <Box bg={'brand.clonika.blue.800'} marginTop={20} padding={4}>
        <FormProducto variant={PRODUCT.llanta} edit={edit} />
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' >
          {
            data.map((element: ElementArgs)=>(
              <CustomCard 
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
