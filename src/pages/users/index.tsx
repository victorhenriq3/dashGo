import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";
import { useQuery } from "react-query";

export default function UserList(){

    const {data, isLoading, error} = useQuery('users', async () => {
        const response = await fetch('http://localhost:3000/api/users')
        const data = await response.json()
    
        return data
    })

    

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
      })

      useEffect(() => {
        
      }, [])
      
    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Usuarios</Heading>
                            <Link href="/users/create" passHref>
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="pink"
                                    leftIcon={<Icon as={RiAddLine} />}
                                >
                                Criar novo usuario
                                </Button>
                            </Link>
                    </Flex> 

                    {isLoading ? (
                        <Flex justify="center"><Spinner /></Flex>
                    ) : error ? ( 
                        <Flex justify="center">
                            <Text>Falha ao obter dados do usuario</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuario</Th>
                                        {isWideVersion && <Th>Data de cadastro</Th>}
                                        <Th w="8"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td px={["4", "4", "6"]} >
                                            <Checkbox colorScheme="pink"/>
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Text fontWeight="bold">Victor Henrique</Text>
                                                <Text fontWeight="small" color="gray.300">vic.1601@outlook.com</Text>
                                            </Box>
                                        </Td>
                                        {isWideVersion && <Td> 04 de abril de 2021</Td>}
                                        
                                        <Td>
                                            <Button
                                                as="a"
                                                size="sm"
                                                fontSize="sm"
                                                colorScheme="purple"
                                                leftIcon={<Icon as={RiPencilLine} />}
                                            >
                                                {isWideVersion ? 'Editar' : ''}
                                            </Button>
                                        </Td>
                                    </Tr>

                                </Tbody>
                            </Table>
                            <Pagination /> 
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}