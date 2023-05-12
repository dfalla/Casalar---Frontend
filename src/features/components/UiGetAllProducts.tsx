import { Box, SimpleGrid } from "@chakra-ui/react";
// import { FormProducto } from "../products";
import { CustomCard, SafeAny } from "../../common";
import { ElementArgs } from "../../interfaces";
import { FormProducto } from "../products";

export interface UiGetAllProductsArgs {
    variant: string;
    edit: boolean | undefined;
    data: ElementArgs[];
}


export const UiGetAllProducts = ({variant, edit, data}: UiGetAllProductsArgs ) => {
  return (
    <>
        <Box bg={'brand.clonika.blue.800'} marginTop={20} padding={4}>
        <FormProducto variant={variant} edit={edit} />
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' >
          {
            data.map((element: ElementArgs)=>(
              <CustomCard 
                key={element.id} 
                id={ element.id }
                variant={variant}
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
