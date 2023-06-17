import { FC, useEffect, useState } from 'react'
import { ErrorMessage, useField } from 'formik';
import { Select, Box, FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react';

interface Option {
  id: number;  
  value: string;
  nombre: string;
  marca?: string;
  id_producto?: string;
}

interface SelectFieldAsynchronousProps {
  name: string;
  label: string;
  parentValue: string;
  parentFieldName?: string;
  fetchOptions: (parentValue: string) => Promise<Option[]>;
  [x: string]: any;
}

export const SelectFieldAsynchronous: FC<SelectFieldAsynchronousProps> = ({
    name,
    label,
    parentValue,
    parentFieldName,
    fetchOptions,
    ...props
}) => {
    const [options, setOptions] = useState<Option[]>([]);
    const [field, meta, helpers] = useField(name);

    useEffect(() => {
        const obtenerOpciones = async () => {
          try {
            const data = await fetchOptions(parentValue);
            // console.log("Data desde obtenerOptions", data)
            setOptions(data);
          } catch (error) {
            console.error('Error al obtener las opciones del select', error);
          }
        };
    
        if (parentValue) {
          obtenerOpciones();
        } else {
          setOptions([]);
        }
    }, [parentValue]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        console.log("selectedValue", selectedValue)
        helpers.setValue(selectedValue);
    };


  return (
    // <FormControl isInvalid={meta.touched && meta.error}>
    <FormControl>
      <FormLabel htmlFor={name} marginBottom={3} marginTop={5}> 
          <Text fontWeight={'bold'}>
              {label}
          </Text>
      </FormLabel> 
      <Select id={name} {...field} onChange={handleChange} value={field.value} {...props}>
        <option value="">Seleccione</option>
        {options.map((option) => (
          <option key={option.id || option.id_producto} value={option.value || option.marca}>
            {option.nombre || option.marca}
          </option>
        ))}
      </Select>
      <Box
        color={'red'}
        marginTop={3}
      >
        <ErrorMessage name={ name }/>
      </Box>
    </FormControl>
  )
}
