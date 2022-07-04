import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import client from '../graphql/client'
import App from '../components/App'
import CreateQuizModal from '../components/CreateQuizModal'

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: any) => page)

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <App>
          {getLayout(<Component {...pageProps} />)}
          <CreateQuizModal />
        </App>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
