import { SafeAny } from '@/common';
import { ElementArgs } from '@/interfaces';
import { Box, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";

interface FilterProps {
    data: ElementArgs[];
    setFilteredData: React.Dispatch<React.SetStateAction<ElementArgs[]>>

}

export const Filter = ({ data, setFilteredData }: FilterProps) => {
    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (event: SafeAny) => {
        setFilterValue(event.target.value);
        handleFilter(event.target.value);
    };
    
    const handleFilter = (filter: string) => {
    
        let filterValue: string = '';
        if(filter.length > 0) filterValue = filter.split('')[0].toUpperCase() + filter.slice(1)
    
        const filteredItems = data.filter((item) => item.marca.includes(filterValue));
        
        setFilteredData(filteredItems);
    };

    useEffect(() => {
        setFilteredData(data);
    }, [data]);
    
    return (
    <Box alignSelf={"center"}>
        <InputGroup>
            <InputRightElement
                pointerEvents="none"
                children={<AiOutlineSearch color="gray.300" />}
            />
            <Input
                type="text"
                value={filterValue}
                onChange={handleFilterChange}
                placeholder="Filtrar..."
                backgroundColor={"white"}
                focusBorderColor={"white"}
                width={200}
            />
        </InputGroup>
    </Box>
    );

}
