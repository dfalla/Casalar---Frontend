import { useField, ErrorMessage } from "formik"
import { Checkbox } from '@chakra-ui/react'

interface Props { 
    label: string;
    name: string;
    [x: string]: any;
}

export const CheckboxField = ({ label, ...props }: Props) => {

    const [ field ] = useField({ ...props, type: 'checkbox' });

  return (
    <>
        <label>
            <Checkbox {...field} {...props} />
            {label}
        </label>
        <ErrorMessage name={ props.name } component="span"/>

    </>
  )
}