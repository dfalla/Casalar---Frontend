import { Box, SimpleGrid } from "@chakra-ui/react";
import { useGetMotores } from "../hooks";
import { PRODUCT } from "../../../constants";
import { FormProducto } from "../domain";
import { ElementArgs } from "../../../interfaces";
import { CustomCard } from "../../../common";


interface MotoresProps {
  edit?: boolean;
}

export const Motores = ({ edit }: MotoresProps) => {
  const {data, isError, isLoading} = useGetMotores();
  console.log('data', data)

  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    <>
      <Box bg={'brand.clonika.blue.800'} marginTop={20} padding={4}>
        <FormProducto variant={PRODUCT.motor} edit={edit}/>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' >
          {
            data.map((element: ElementArgs)=>(
              <CustomCard 
                key={element.id} 
                id={ element.id }
                variant={PRODUCT.motor}
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
