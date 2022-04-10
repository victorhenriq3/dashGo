import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps{
    showProfileData: boolean
}

export function Profile({showProfileData}: ProfileProps){
    return (
        <Flex align="center">
            {showProfileData && <Box mr="4" textAlign="right">
                <Text>Victor Henrique</Text>
                <Text color="gray.300" fontSize="small">vic.1601@outlook.com</Text>
            </Box>
            }

            <Avatar size="md" name="Victor Henrique"/>
        </Flex>
    )
}