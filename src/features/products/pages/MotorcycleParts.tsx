import { useQuery } from "@tanstack/react-query"
import { Card } from "../../../common"
import { getProducts } from "../../../api/motorcycle";
import { Box, Text, SimpleGrid, Heading } from "@chakra-ui/react";

export const MotorcycleParts = () => {

  const { data, isLoading, error, isError } = useQuery({ queryKey: ['aceites'], queryFn: getProducts })

  if(isLoading){
    return <h1>Cargando los Datos, espere por favor</h1>
  }
  
  return (

    <Box marginTop={20}>
      <Box textAlign={'center'}>
        <Heading>ACEITES</Heading>
      </Box>

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
    </Box>
    
  )
}
