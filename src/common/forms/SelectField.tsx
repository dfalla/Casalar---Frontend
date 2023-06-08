import { useField, ErrorMessage } from "formik"
import { Box, FormControl, FormLabel, Select, Text } from '@chakra-ui/react'

interface Props { 
    label: string;
    name: string;
    placeholder?: string;
    [x: string]: any;
}

export const SelectField = ({ label, ...props }: Props) => {

    const [ field ] = useField(props);

  return (
    <FormControl>
      <FormLabel htmlFor={props.id || props.name} marginBottom={3} marginTop={5}>
        <Text fontWeight={'bold'}>
          {label}
        </Text>
      </FormLabel>
      <Select {...field} {...props} />
      <Box
        color={'red'}
      >
        <ErrorMessage name={ props.name }/>
      </Box>
        
    </FormControl>
  )
}