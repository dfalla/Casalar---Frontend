import { SafeAny } from '@/common';
import { ElementArgs } from '@/interfaces';
import { Box, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";

export const Filter = ({ data, onFilter }: {data: ElementArgs[], onFilter: (filterValue: string) => void}) => {
    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (event: SafeAny) => {
        setFilterValue(event.target.value);
        onFilter(event.target.value);
    };
    
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
