import { useQuery } from "@tanstack/react-query"
import { Card } from "../../../common"
import { getProducts } from "../../../api/motorcycle";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";




export const MotorcycleParts = () => {

  const { data, isLoading, error, isError } = useQuery({ queryKey: ['aceites'], queryFn: getProducts })
  console.log('data desde el componente MotorcycleParts', data)

  if(isLoading){
    return <h1>Cargando los Datos, espere por favor</h1>
  }
  
  return (
    
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' marginTop={20}>
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
  )
}
