import { Box, Button, chakra, Heading, Input } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import * as yup from 'yup'
import { useEffect } from "react"
import useQueryParam from "../../hooks/useQueryParam"
import { gql, useApolloClient, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries'
import useIsLoggedIn from "../../hooks/useIsLoggedIn"
import Layout from "../../components/Layout"
import useGetMeLazyQuery from "../../hooks/useGetMeLazyQuery"

type TabType = 'login' | 'register'

const Auth = () => {
  const [getMe] = useGetMeLazyQuery()

  const isLoggedIn = useIsLoggedIn()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home')
    }
  }, [isLoggedIn])

  const [register] = useMutation(mutations.REGISTER, {
    onCompleted(data) {
      localStorage.setItem('auth-token', data.register.token)
    }
  })

  const [login] = useMutation(mutations.LOGIN, {
    onCompleted(data) {
      localStorage.setItem('auth-token', data.login.token)
      getMe()
    },
  })

  const router = useRouter()

  const tab = useQueryParam('tab') as TabType | undefined

  const form = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: yup.object({
      username: yup.string().required('required').min(3, 'min 3').max(15, 'max 15'),
      password: yup.string().required('required').min(3, 'min 3').max(15, 'max 15')
    }),
    async onSubmit({ username, password }) {
      try {
        if (tab === 'register') {
          await register({ variables: { username, password }})
        } else if (tab === 'login') {
          await login({ variables: { username, password } })
        }
      } catch (e) {
        console.log(e)
        alert('error')
      } finally {
        form.resetForm()
      }
    }
  })

  useEffect(() => {
    if (!tab || !['login', 'register'].includes(tab)) {
      router.push('/auth?tab=login')
    }
  }, [])

  return (
    <StyledForm onSubmit={form.handleSubmit}>
      <Heading as='h1' size='lg' textAlign='center'>
        {
          tab === 'login' ? 'Login' : tab === 'register' && 'Register'
        }
      </Heading>
      <Input
        mt='20px'
        placeholder='Username'
        variant='filled'
        isInvalid={!!(form.touched.username && form.errors.password)}
        {...form.getFieldProps('username')}
      />
      <Input
        mt='5px'
        placeholder='Password'
        variant='filled'
        isInvalid={!!(form.touched.password && form.errors.password)}
        {...form.getFieldProps('password')}
      />
      {
        tab === 'login' && (
          <Button w='100%' type='submit' colorScheme='blue' mt='40px' isLoading={form.isSubmitting}>
            Login
          </Button>
        )
      }
      {
        tab === 'register' && (
          <Button w='100%' type='submit' colorScheme='blue' mt='40px' isLoading={form.isSubmitting}>
            Register
          </Button>
        )
      }
    </StyledForm>
  )
}

const StyledForm = chakra('form', {
  baseStyle: {
    maxW: '400px',
    marginInline: 'auto'
  }
})

Auth.getLayout = (page: any) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Auth
