import { Box, HStack, Select } from "@chakra-ui/react"
import { Form, Formik } from 'formik'

export interface Sale {
    product: string;
    marca: string;
    precio: number | null;
    cantidad: string;

}

const INITIALVALUES: Sale = {
    product: '',
    marca: '',
    precio: null,
    cantidad: ''
}

export const FormSale = () => {
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
                        <HStack>
                            <Select placeholder='Seleccionar Producto'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>

                            <Select placeholder='Seleccionar Marca'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </HStack>
                    </Form>
                )
            }
        </Formik>
        
    </Box>
  )
}
