import { useField, ErrorMessage } from "formik"
import { Select } from '@chakra-ui/react'

interface Props { 
    label: string;
    name: string;
    placeholder?: string;
    [x: string]: any;
}

export const SelectField = ({ label, ...props }: Props) => {

    const [ field] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Select {...field} {...props} />
      <ErrorMessage name={ props.name } component="span"/>
        
    </>
  )
}