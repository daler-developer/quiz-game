import { chakra } from "@chakra-ui/react"
import Container from "./Container"
import ErrorAlert from "./ErrorAlert"
import Header from "./Header"

interface IProps {
  children: any
}

export default ({ children }: IProps) => {
  return <>
    <StyledWrapper paddingTop={70}>
      <Header />
      <ErrorAlert />
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
