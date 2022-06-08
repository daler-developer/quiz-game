import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, chakra, Container, Link, Text } from "@chakra-ui/react"
import NextLink from 'next/link'
import { currentVisibleModal, ModalsEnum } from "../graphql/state"
import useGetMeQuery from "../hooks/useGetMeQuery"
import useIsLoggedIn from "../hooks/useIsLoggedIn"

export default () => {
  const isLoggedIn = useIsLoggedIn()

  const { data } = useGetMeQuery()

  console.log(data)

  const handlers = {
    newQuizBtnClick() {
      currentVisibleModal(ModalsEnum.CREATE_QUIZ)
    },
    logoutBtnClick() {
      localStorage.removeItem('auth-token')
      location.reload()
    }
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
                  <Link color='teal.500'>
                    Login
                  </Link>
                </NextLink>

                <NextLink href={'/auth?tab=register'} passHref>
                  <Link color='teal.500'>
                    Register
                  </Link>
                </NextLink>
              </>
            }
          </StyledHeaderLeft>

          <StyledHeaderRight>
            <NextLink href='/home' passHref>
              <Link color='teal.500'>
                Home
              </Link>
            </NextLink>

            <NextLink href='/history' passHref>
              <Link color='teal.500'>
                History
              </Link>
            </NextLink>

            {
              isLoggedIn && (
                <Button size='sm' colorScheme='red' variant='ghost' onClick={handlers.logoutBtnClick}>
                  Logout
                </Button>
              )
            }

            <Button leftIcon={<AddIcon />} size='sm' colorScheme='pink' variant='solid' onClick={handlers.newQuizBtnClick}>
              Quiz
            </Button>
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
