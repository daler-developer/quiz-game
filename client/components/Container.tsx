import { chakra, Container } from "@chakra-ui/react"

interface IProps {
  children: any
}

export default ({ children }: IProps) => {
  return (
    <StyledWrapper>
      {children}
    </StyledWrapper>
  )
}

const StyledWrapper = chakra(Container, {
  baseStyle: {
    maxW: '1200px',
    paddingInline: '15px'
  }
})
