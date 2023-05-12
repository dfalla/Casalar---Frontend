import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button
} from '@chakra-ui/react';
import { PRODUCT } from '../../../constants';
import { useDeleteProduct } from '../../../features';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export interface CardArgs{
  id: number;
  variant: string;
  descripcion: string;
  marca: string;
  imagen: string;
  precio: string;
  stock: string;
}


export const CustomCard = ({marca, imagen, precio, stock, id, variant, descripcion} : CardArgs) => {
  const navigate = useNavigate();
  
  const { mutate } = useDeleteProduct(variant);

  const deleteItem = (id: number) => {
    Swal.fire({
      title: `¿Estás seguro que desea eliminar el ${variant} de marca ${marca}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then(( result )=>{
      if(result.isConfirmed) {
        mutate(id)
      }
    });
  }

  const editProduct = (id: number, variant: string) => {
    // const rutaFinal = finalRoute({ variant, id})

    let rutaFinal: string = '';
    if(variant === PRODUCT.motor){
      rutaFinal = `/${variant}/${id}`
    } else if(variant === PRODUCT.fumigadora) {
      rutaFinal = `/mochilas/${variant}/${id}`
    } else {
      rutaFinal = `/motorepuestos/${variant}/${id}`
    }
    navigate(rutaFinal)
  }

  return (
    <Box
      role={'group'}
      marginTop={10}
      p={6}
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}>
      <Box
        rounded={'lg'}
        mt={-12}
        pos={'relative'}
        height={'230px'}
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 5,
          left: 0,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: 'blur(20px)',
          },
        }}
      >
        <Image
          rounded={'lg'}
          height={230}
          width={282}
          objectFit={'cover'}
          src={imagen}
        />
      </Box>
      <Stack pt={10} align={'center'}>
        <Text color={'brand.clonika.blue.800'} fontSize={'sm'} textTransform={'uppercase'}>
          { marca }
        </Text>
        <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500}>
          { descripcion.slice(0,17).padEnd(20, '.') }
        </Heading>
        <Stack direction={'row'} align={'center'}>
          <Text fontWeight={800} >
            En stock: { stock }
          </Text>
          <Text color={'gray.600'}>
            { `S/.${precio} ` }
          </Text>
        </Stack>
      </Stack>
      <Stack mt={8} direction={'row'} spacing={4}>
        <Button 
          onClick={()=>deleteItem(id)}
          colorScheme='red'
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
        >
          Eliminar 
        </Button>
        <Button
          onClick={() => editProduct(id, variant)}
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          bg={'brand.clonika.blue.800'}
          color={'white'}
          boxShadow={
          '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
          }
          _hover={{
            bg: 'brand.clonika.blue.700',
          }}
        >
          Editar
        </Button>
      </Stack>
    </Box>
  );
}
