import { InputField, SelectField } from "@/common";
import { Box, Button, HStack } from "@chakra-ui/react"
import { Form, Formik } from 'formik'
import { useGetAllNameOfProducts } from "../hooks";
import { INITIALVALUES, validationSchema } from "../domain";

export interface Data {
    id     : number;
    nombre : string;
}

export const FormSale = () => {
    const { data, isError, isLoading } = useGetAllNameOfProducts();

    let newData: Data[] = [];

    if(data != undefined){
        newData = data.sort((a: Data, b: Data) => a.nombre.localeCompare(b.nombre) )
    }

  return (
    <Box>
        <Formik
            initialValues={ INITIALVALUES }
            validationSchema={ validationSchema }
            onSubmit={(values)=>{
                console.log("venta: ", values)
            }}
        >
            {
                ({ values }) => (
                    <Form>
                        <HStack
                            flexDirection={["column","column","row","row"]}
                            alignItems={["center", "center"]} 
                            gap={[5,5,20,20]}
                        >
                            <SelectField label="Productos" name="producto" placeholder="Selecciona un producto">
                                {
                                    newData != undefined &&
                                    newData.map(({id, nombre}: {id: number, nombre: string}) => (
                                            <option key={id} value={`${nombre}`}>{ nombre }</option>
                                        ))
                                }
                            </SelectField>

                            <SelectField 
                                label="Marca" 
                                name="marca" 
                                isDisabled={ 
                                    values.producto  ? false : true
                                }
                            >
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </SelectField>

                            <InputField
                                name='precio'
                                label='Precio'
                                type='number'
                            /> 

                            <InputField
                                name='cantidad'
                                label='Cantidad'
                                type='number'
                            />

                            <Box>
                                <Button 
                                    bg='brand.clonika.blue.800' 
                                    marginTop={10} 
                                    type='submit'
                                >
                                    Añadir
                                </Button>    
                            </Box> 
                        </HStack>

                        
                    </Form>
                )
            }
        </Formik>
        
    </Box>
  )
}
