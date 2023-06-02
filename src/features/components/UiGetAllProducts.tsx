import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import { CustomCard, InputField } from "@/common";
import { ElementArgs, UiGetAllProductsArgs } from "@/interfaces";
import { FormProducto } from "../products";
import { Filter } from "./Filter";

export const UiGetAllProducts = ({variant, edit, data}: UiGetAllProductsArgs ) => {
  return (
    <>
      <Box bg={'brand.clonika.blue.800'} marginTop={20} padding={4}>
        <HStack
          justifyContent={"space-between"}
          align="center"
          flexWrap="wrap"
          maxW="inherit"
          mx="auto"
          alignItems={'flex-end'}
          marginBottom={"20px"}
        >
          <Filter/>
          <FormProducto variant={variant} edit={edit} />
        </HStack>
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
