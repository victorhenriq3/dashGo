import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { useSideBarDrawer } from '../../context/SideBarDrawerContext'
import { Logo } from '../Header/Logo'
import { NotificationsNav } from '../Header/NotificationsNav'
import { Profile } from '../Header/Profile'
import { SearchBox } from '../Header/Search'
import { RiMenuLine } from "react-icons/ri"

export function Header(){
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const {onOpen} = useSideBarDrawer()

    return (
        <Flex 
            w="100%" 
            as="header" 
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"    
        >
            {!isWideVersion && (
                <IconButton
                  aria-label='open navigation'
                  icon={<Icon
                  as={RiMenuLine}/>}
                  fontSize="24"
                  variant="unstyled"
                  onClick={onOpen}
                  mr="2"
                >

                </IconButton>
            )}
            <Logo />

            {isWideVersion && <SearchBox />}
            

            <Flex align="center" ml="auto">
                <NotificationsNav />
                <Profile showProfileData={isWideVersion }/>
            </Flex>
        </Flex>
    )
}