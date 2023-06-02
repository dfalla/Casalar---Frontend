import { InputField } from '@/common';
import { Formik, Form } from 'formik';
import { AiOutlineSearch } from "react-icons/ai";

const INITIALVALUES = {
    filter: ""
} 

export const Filter = () => {
  return (
    <Formik
        initialValues={INITIALVALUES}
        onSubmit={(values)=>{
            console.log((values))
        }}
    >
        <Form>
            <InputField
                name='filtro'
                label=''
                type='text'
                placeholder={`Filtro...`}
                color="black"
                backgroundColor="white"
                focusBorderColor="white"
            /> 
        </Form>
    </Formik>
  )
}
