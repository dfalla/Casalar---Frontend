import { useEffect, useState } from 'react';
import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import { CustomCard, InputField, SafeAny } from "@/common";
import { ElementArgs, UiGetAllProductsArgs } from "@/interfaces";
import { FormProducto } from "../products";
import { Filter } from "./Filter";

export const UiGetAllProducts = ({variant, edit, data}: UiGetAllProductsArgs ) => {
  
  const [filteredData, setFilteredData] = useState<ElementArgs[]>(data);

  return (
    <>
      <Box bg={'brand.clonika.blue.800'} marginTop={20} padding={4}>

        <HStack
          flexWrap="wrap"
          maxW="inherit"
          mx="auto"
          marginBottom={"20px"}
          flexDirection={["column","row","row","row"]}
          gap={[5,5,0,0]}
          justifyContent={["center","center","space-between","space-between"]}
          alignItems={["center", "center", "center", "center"]}
          
        >
          <Filter data={data} setFilteredData={setFilteredData}/>

          <FormProducto variant={variant} edit={edit} />

        </HStack>

        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' >
          {
            filteredData.map((element: ElementArgs)=>(
              <CustomCard 
                key={element.id_producto} 
                id_producto={ element.id_producto}
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
