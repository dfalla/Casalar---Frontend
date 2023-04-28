import { useQuery } from "@tanstack/react-query"
import { getAceites, getLlantas } from "../../../api/motorcycle";
import { Box, SimpleGrid, Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Text  } from "@chakra-ui/react";
import { Aceites, Llantas } from "../components";

interface MotorcyclePartsProps {
  edit?: boolean;
}


export const MotorcycleParts = ( { edit }: MotorcyclePartsProps ) => {
  
  return (
    <Box marginTop={20}>
      <h1> Tabla de todos los productos </h1>
    </Box>
    
  )
}
