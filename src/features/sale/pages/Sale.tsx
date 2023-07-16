import React from 'react';
import { Box, Text, VStack } from "@chakra-ui/react"
import { FormSale, SalesInTheCart } from "../components"

export const Sale = () => {
  return (
    <Box
      marginTop={20} 
      padding={4}
      backgroundColor={'white'}
    >
      <VStack
        alignItems={'flex-start'}
        gap={20}
      >
        <FormSale/>
        <SalesInTheCart/>
      </VStack>
    </Box>
  )
}
