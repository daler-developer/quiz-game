import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, chakra, Container, Link, Text } from "@chakra-ui/react"
import NextLink from 'next/link'
import { currentVisibleModal, ModalsEnum } from "../graphql/state"
import useGetMeQuery from "../hooks/useGetMeQuery"
import useIsLoggedIn from "../hooks/useIsLoggedIn"

export default () => {
  const isLoggedIn = useIsLoggedIn()

  const { data } = useGetMeQuery()

  const handleNewQuizBtnClick = () => {
    currentVisibleModal(ModalsEnum.CREATE_QUIZ)
  }
  
  const handleLogoutBtnClick = () => {
    localStorage.removeItem('auth-token')
    location.reload()
  }

  return (
    <StyledHeader>
      <Container maxW='1200px' paddingInline='15px'>
        <StyledBody>

          <StyledHeaderLeft>
            {
              isLoggedIn ? (
                <StyledUsername>
                  {data!.getMe.username} 
                </StyledUsername>
              ) : <>
                <NextLink href={'/auth?tab=login'} passHref>
                  <Button color='teal.500' variant="ghost" size="sm">
                    Login
                  </Button>
                </NextLink>

                <NextLink href={'/auth?tab=register'} passHref>
                  <Button color='teal.500' variant="ghost" size="sm">
                    Register
                  </Button>
                </NextLink>
              </>
            }
          </StyledHeaderLeft>

          <StyledHeaderRight>

            {
              isLoggedIn && <>
                <NextLink href='/home' passHref>
                  <Button size="sm" variant="ghost" color='teal.500'>
                    Home
                  </Button>
                </NextLink>
                <Button size='sm' colorScheme='red' variant='ghost' onClick={handleLogoutBtnClick}>
                  Logout
                </Button>
                <Button leftIcon={<AddIcon />} size='sm' colorScheme='pink' variant='solid' onClick={handleNewQuizBtnClick}>
                  Quiz
                </Button>
              </>
            }

          </StyledHeaderRight>

        </StyledBody>
      </Container>
    </StyledHeader>
  )
}

const StyledHeader = chakra('header', {
  baseStyle: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  }
})

const StyledBody = chakra('div', {
  baseStyle: {
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'gray.300',
    borderBottomWidth: '1px',
    padding: '0 7px'
  }
})

const StyledHeaderLeft = chakra('div', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }
})

const StyledHeaderRight = chakra('div', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }
})

const StyledUsername = chakra(Text, {
  baseStyle: {
    fontSize: '20px',
    fontWeight: '600',
    textTransform: 'uppercase'
  }
})
