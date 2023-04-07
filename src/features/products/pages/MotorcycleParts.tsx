import { useQuery } from "@tanstack/react-query"
import { Card } from "../../../common"
import { useEffect } from "react";
import { getProducts } from "../../../api/motorcycle";
// import { getProducts } from "../../../api/motorcycle"
export const MotorcycleParts = () => {

  // Queries
  const query = useQuery({ queryKey: ['productos'], queryFn: getProducts })
  console.log('query', query)
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Card/>
  )
}
