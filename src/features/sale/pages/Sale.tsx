import React from 'react';
import { Box, Text, VStack } from "@chakra-ui/react"
import { FormSale, TableOfSales } from "../components"
import { SalesProvider } from "../context/SalesContext"

export const Sale = () => {
  return (
    <Box
      marginTop={"100px"}
      backgroundColor={'white'}
      padding={4}
    >
      <VStack
        alignItems={'flex-start'}
        gap={20}
      >
        <SalesProvider>
          <FormSale/>
          <TableOfSales/>
        </SalesProvider>
      </VStack>
    </Box>
  )
}
