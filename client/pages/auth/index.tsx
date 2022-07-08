import { Box, Button, Heading, Input } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import * as yup from 'yup'
import { useEffect } from "react"
import useQueryParam from "../../hooks/useQueryParam"
import useIsLoggedIn from "../../hooks/useIsLoggedIn"
import Layout from "../../components/Layout"
import useLoginMutation from "../../hooks/useLoginMutation"
import useRegisterMutation from "../../hooks/useRegisterMutation"

type TabType = 'login' | 'register'

const Auth = () => {
  const isLoggedIn = useIsLoggedIn()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home')
    }
  }, [isLoggedIn])

  const [register] = useRegisterMutation()
  const [login] = useLoginMutation()

  const router = useRouter()

  const tab = useQueryParam('tab') as TabType | undefined

  const form = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: yup.object({
      username: yup.string().required('required').min(3, 'min 3').max(20, 'max 20'),
      password: yup.string().required('required').min(3, 'min 3').max(20, 'max 20')
    }),
    async onSubmit({ username, password }) {
      try {
        if (tab === 'register') {
          await register({ variables: { username, password }})
        } else if (tab === 'login') {
          await login({ variables: { username, password } })
        }
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
    <Box as="form" onSubmit={form.handleSubmit} sx={{ maxW: '400px', marginInline: 'auto' }}>
      <Heading as='h1' size='lg' textAlign='center'>
        {
          tab === 'login' ? 'Login' : tab === 'register' && 'Register'
        }
      </Heading>
      <Input
        mt='20px'
        placeholder='Username'
        variant='filled'
        isInvalid={form.touched.username && !!form.errors.username}
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
    </Box>
  )
}

Auth.getLayout = (page: any) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Auth
