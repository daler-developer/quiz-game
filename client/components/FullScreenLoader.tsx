import { Box, Flex, Spinner } from "@chakra-ui/react"

export default () => {
  return (
    <Flex bg='white' align='center' justify='center' position='fixed' top={0} left={0} bottom={0} right={0}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
  )
}
