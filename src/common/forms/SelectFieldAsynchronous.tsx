import { FC, useEffect, useState } from 'react'
import { ErrorMessage, useField } from 'formik';
import { Select, Box, FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react';
import { useSales } from '@/context/SalesContext';

interface Option {
  id: number;  
  value: string;
  nombre: string;
  marca?: string;
  stock?: number;
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
    const { saveNameProducto, saveIdMarcaProduct } = useSales();

    useEffect(() => {
      if(field.name === 'producto'){
        // console.log("producto", field)
        saveNameProducto(field.value)
      }
  
      if(field.name === 'marca'){
        saveIdMarcaProduct(field.value);
      }
    }, [field]);

    useEffect(() => {
        const obtenerOpciones = async () => {
          try {
            const data = await fetchOptions(parentValue);
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
        {options.length > 0 && options.map((option) => (
          <option key={option.id || option.id_producto} value={option.value || option.id_producto}>
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
