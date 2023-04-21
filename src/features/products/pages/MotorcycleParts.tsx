import { useQuery } from "@tanstack/react-query"
import { Card } from "../../../common"
import { getAceites, getLlantas } from "../../../api/motorcycle";
import { Box, SimpleGrid, Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon  } from "@chakra-ui/react";
import { Aceites, Llantas } from "../components";

export const MotorcycleParts = () => {
  // const { data, isLoading, error, isError } = useQuery({ queryKey: ['aceites'], queryFn: getAceites })
  const { data, isLoading, error, isError } = useQuery({ queryKey: ['llantas'], queryFn: getLlantas })


  if(isLoading){
    return <h1>Cargando los Datos, espere por favor</h1>
  }

  return (
    <Box marginTop={20}>
      <Accordion defaultIndex={[0]} allowMultiple>
        <Llantas/>
        <Aceites/>
      </Accordion>
    </Box>
    
  )
}
