import { Box, Container } from "@chakra-ui/react"
import Header from "./Header"

interface IProps {
  children: any
}

export default ({ children }: IProps) => {
  return <>
    <Box paddingTop={70}>
      <Header />
      <Container maxW='1200px' paddingInline='15px'>
        {children}
      </Container>
    </Box>
  </>
}
