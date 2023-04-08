import { useQuery } from "@tanstack/react-query"
import { Card } from "../../../common"
import { getProducts } from "../../../api/motorcycle";
import { Box, Flex } from "@chakra-ui/react";

export const MotorcycleParts = () => {

  const { data, isLoading, error, isError } = useQuery({ queryKey: ['productos'], queryFn: getProducts })
  console.log('data desde el componente MotorcycleParts', data)

  if(isLoading){
    return <h1>Cargando los Datos, espere por favor</h1>
  }
  
  return (
    <Box 
      zIndex={100}
    >
      <Flex 
        gap={5}
        flexDirection={['column', 'column', 'row']}
      >
        {
          data.map((element: any)=>(
            <Card key={element.id} nombre={element.nombre} descripcion={element.descripcion}/>
          ))
        }
      </Flex>
    </Box>
  )
}
