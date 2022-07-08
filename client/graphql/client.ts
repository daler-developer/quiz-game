import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth-token')

  const newHeaders = { ...headers }

  if (token) {
    newHeaders.authorization = `Bearer ${token}`
  }

  return {
    headers: newHeaders
  }
})

export default new ApolloClient({
  link: authLink.concat(createUploadLink({ uri: 'http://localhost:4000/graphql' })),
  cache: new InMemoryCache()
})
