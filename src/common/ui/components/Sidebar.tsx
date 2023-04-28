import { ReactNode } from 'react';
import Swal from "sweetalert2";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel
} from '@chakra-ui/react';
import {
  FiMenu,
  FiChevronDown,
  FiBell,
} from 'react-icons/fi';
import { FaMotorcycle } from "react-icons/fa";
import { GiBackpack } from "react-icons/gi";
import { TbCircuitMotor } from "react-icons/tb";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useAuthStore } from '../../../store';
import { NavLink } from "react-router-dom";

interface SubContent {
  title: string;
  path: string;
}

interface LinkItemProps {
  name: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  path: string;
  subContent?: SubContent[];
}

const LinkItems: Array<LinkItemProps> = [
  { 
    name: 'Dashboard', 
    icon: <MdOutlineDashboardCustomize/>, 
    path: '/dashboard', 
  },
  { 
    name: 'Motorepuestos', 
    icon: <FaMotorcycle/>, 
    path: '/motorepuestos', 
    subContent: [
      {
        title: 'aceites',
        path: '/motorepuestos/aceites'
      },
      {
        title: 'llantas',
        path: '/motorepuestos/llantas'
      }
    ] 
  },

  { 
    name: 'Mochilas', 
    icon: <GiBackpack/>, 
    path: '/mochilas',
    subContent: [
      {
        title: 'fumigadoras',
        path: '/mochilas/fumigadoras'
      }
    ]
  },
  { 
    name: 'Motores', 
    icon: <TbCircuitMotor/>, 
    path: '/motores',
  },
];

export const Sidebar = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen}/>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        link.hasOwnProperty('subContent') 
           ? (
              <Accordion borderColor={'white'} key={link.name} allowToggle> 
                <AccordionItem >
                  <h2>
                    <AccordionButton 
                      // as={Button}
                      // _hover={{
                      //   backgroundColor: 'brand.clonika.blue.700',
                      //   color: 'white'
                      // }}
                    >
                          {/* <HStack justifyContent={'space-between'}> */}
                            <Button 
                              flex='1'
                              width={'100%'} 
                              textAlign='left' 
                              color={'black'} 
                              leftIcon={link.icon}
                              _hover={{
                                color: 'white'
                              }}
                            >

                              <Box as="span" flex='1' textAlign='left'>
                                {link.name}
                              </Box>

                            </Button>
                            <AccordionIcon/>

                          {/* </HStack> */}
                        

                    </AccordionButton>
                  </h2>

                  <AccordionPanel pb={4}>
                    { link.subContent!.map((item)=>(
                      <VStack key={item.title}>
                        
                          <Button
                            as={NavLink}
                            to={item.path}
                            width={'100%'}
                            color='black' 
                            _hover={{
                              backgroundColor: 'brand.clonika.blue.700',
                              color: 'white'
                            }}
                          >
                            {/* <NavItem key={item.title} path={item.path}> */}
                              {item.title}
                            {/* </NavItem> */}
                          
                          </Button>
                      </VStack>
                      
                    ))}
                  </AccordionPanel>
                </AccordionItem>
             </Accordion>
            )
           : (
              <Box>
                <Button 
                  flex='1'
                  color={'black'} 
                  leftIcon={link.icon}
                  textAlign={'left'} 
                  width={'100%'}
                  key={link.name} 
                  as={NavLink}
                  to={link.path}
                  _hover={{
                    backgroundColor: 'brand.clonika.blue.700',
                    color: 'white'
                  }}
                >
                  {link.name}
                </Button>
              </Box>
           )
            

        
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon?: IconType;
  path: string;
  children: ReactText;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  return (
    <NavLink to={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const logout = useAuthStore((state) => state.logout);
  const profile = useAuthStore((state) => state.profile);

  const { apellido, nombre } = profile;
  
  const logoutSesion = () => {
    Swal.fire({
      title: `¿Desea cerrar sesión?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
    }).then(( result )=>{
      if(result.isConfirmed) {
        logout();
      }
    });
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      position={'fixed'}
      width={['100vw','100vw','calc(100vw - 239px)']}
      zIndex={999}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
               as={Button}
               rightIcon={<FiChevronDown color='black'/>}
               py={2}
               transition="all 0.3s"
               bg={'inherit'}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm" color={'black'}>{`${nombre} ${apellido}`}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Aquí va el Rol
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuItem>Sign out</MenuItem>
              <MenuItem
                onClick={ ()=>{
                  logoutSesion();
                } }
              >Cerrar Sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};