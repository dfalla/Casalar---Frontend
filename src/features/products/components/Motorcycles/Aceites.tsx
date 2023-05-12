import { Box, SimpleGrid } from "@chakra-ui/react";
import { CustomCard } from "../../../../common"
import { FormProducto } from "../../domain";
import { useGetAceites } from "../../hooks";
import { ElementArgs } from "../../../../interfaces";
import { PRODUCT } from "../../../../constants";

interface AceitesProps {
  edit?: boolean;
}

export const Aceites = ({ edit }: AceitesProps) => {
  const {data, isError, isLoading} = useGetAceites();

  if(isLoading){
    
    // COLOCAR UN SPINNER
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    <>
      <Box bg={'brand.clonika.blue.800'} marginTop={20} padding={4}>
        <FormProducto variant={PRODUCT.aceite} edit={edit}/>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' >
          {
            data.map((element: ElementArgs)=>(
              <CustomCard 
                key={element.id} 
                id={ element.id }
                variant={PRODUCT.aceite}
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
