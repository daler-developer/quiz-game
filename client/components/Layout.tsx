import { Box, chakra } from "@chakra-ui/react"
import Container from "./Container"
import Header from "./Header"

interface IProps {
  children: any
}

export default ({ children }: IProps) => {
  return <>
    <StyledWrapper paddingTop={70}>
      <Header />
      <Container>
        {children}
      </Container>
    </StyledWrapper>
  </>
}

const StyledWrapper = chakra('div', {
  baseStyle: {
    pt: '70px'
  }
})
