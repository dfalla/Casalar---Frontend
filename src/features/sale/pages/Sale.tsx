import { Box, Text, VStack } from "@chakra-ui/react"
import { FormSale, TableOfSales } from "../components"

export const Sale = () => {
  return (
    <Box
      marginTop={"100px"}
      marginLeft={"50px"}
      backgroundColor={'white'}
      padding={4}
    >
      <VStack
        alignItems={'flex-start'}
        gap={20}
      >
        <FormSale/>
        <TableOfSales/>
      </VStack>
    </Box>
  )
}
