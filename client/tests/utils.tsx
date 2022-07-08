import { MockedProvider } from '@apollo/client/testing'
import { ChakraProvider } from "@chakra-ui/react"
import { render } from "@testing-library/react"
import mocks from './graphql/mocks'

const AllTheProviders = ({ children }: any) => {
  return (
    <ChakraProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    </ChakraProvider>
  )
}

export const customRender = (ui: any, options?: object) => {
  return render(ui, {wrapper: AllTheProviders, ...options})
}
