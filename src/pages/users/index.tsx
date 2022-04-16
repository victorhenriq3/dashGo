import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryCliente";

export default function UserList(){

    const [currentPage, setCurrentPage] = useState(1)

    const {data, isLoading, isFetching, error} = useUsers(currentPage)

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
      })
    
    async function handlePrefetchUser(userId: string){
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`)

            return response.data
        }, {
            staleTime: 1000 * 60 * 10
        })
    }


    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuarios
                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
                        </Heading>
                            <NextLink href="/users/create" passHref>
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="pink"
                                    leftIcon={<Icon as={RiAddLine} />}
                                >
                                Criar novo usuario
                                </Button>
                            </NextLink>
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
                                    {data.users?.map(user => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={["4", "4", "6"]} >
                                                    <Checkbox colorScheme="pink"/>
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                            <Text fontWeight="bold">{user.name}</Text>
                                                        </Link>
                                                        <Text fontWeight="small" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>
                                                {isWideVersion && <Td> {user.createdAt}</Td>}
                                                
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
                                        )
                                    })}

                                </Tbody>
                            </Table>
                            <Pagination
                              totalCountOfRegisters={data.totalCount} 
                              currentPage={currentPage}
                              onPageChange={setCurrentPage}
                            /> 
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}