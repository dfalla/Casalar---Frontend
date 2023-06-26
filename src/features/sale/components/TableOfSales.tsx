import { Box } from "@chakra-ui/react"
import { useSales } from "../context/SalesContext";


export const TableOfSales = () => {
  const { sales } = useSales();
  console.log("sales desde el componente TableOfSales", sales)
  return (
    <Box>
        TableOfSales
    </Box>
  )
}
