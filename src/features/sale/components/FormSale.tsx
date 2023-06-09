import { SelectField } from "@/common";
import { Box, HStack } from "@chakra-ui/react"
import { Form, Formik } from 'formik'
import { useGetAllNameOfProducts } from "../hooks";

export interface Sale {
    producto: string;
    marca: string;
    precio: number | null;
    cantidad: string;

}

const INITIALVALUES: Sale = {
    producto: '',
    marca: '',
    precio: null,
    cantidad: ''
}

export const FormSale = () => {
    const { data, isError, isLoading } = useGetAllNameOfProducts();
    console.log('nombres de productos: ', data)
  return (
    <Box>
        <Formik
            initialValues={ INITIALVALUES }
            onSubmit={(values)=>{
                console.log("venta: ", values)
            }}
        >
            {
                ()=>(
                    <Form>
                        <HStack gap={20}>
                            <SelectField label="Productos" name="producto">
                                {
                                    data != undefined &&
                                        data.map(({id, nombre}: {id: number, nombre: string}) => (
                                            <option key={id} value={`${nombre}`}>{ nombre }</option>
                                        ))
                                }
                            </SelectField>

                            <SelectField label="Marca" name="marca" >
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </SelectField> 

                        
                        </HStack>
                    </Form>
                )
            }
        </Formik>
        
    </Box>
  )
}
