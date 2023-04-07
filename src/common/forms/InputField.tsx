import { useField, ErrorMessage } from "formik"
import { Box, Input } from '@chakra-ui/react'

interface Props { 
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    [x: string]: any;
}

export const InputField = ({ label, ...props }: Props) => {

    const [ field ] = useField(props);

  return (
    <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Input className="input-text" type="text" {...field} {...props} />
        <Box
          color={'red'}
        >
          <ErrorMessage name={ props.name }/>
        </Box>
        
    </>
  )
}