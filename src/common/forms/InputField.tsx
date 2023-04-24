import { useField, ErrorMessage } from "formik"
import { Box, Input, FormControl, FormLabel, Text } from '@chakra-ui/react'

interface Props { 
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    [x: string]: any;
}

export const InputField = ({ label, ...props }: Props) => {

    const [ field ] = useField(props);

  return (
    <FormControl>
      <FormLabel htmlFor={props.id || props.name} marginBottom={3} marginTop={5}>
        <Text fontWeight={'bold'}>
          {label}
        </Text>
      </FormLabel>
      <Input className="input-text" type="text" {...field} {...props} />
      <Box
        color={'red'}
      >
        <ErrorMessage name={ props.name }/>
      </Box>
    </FormControl>
  )
}