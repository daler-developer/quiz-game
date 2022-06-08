import { chakra, IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface IProps {
  onNextBtnClick: Function
  onPrevBtnClick: Function
}

export default ({ onPrevBtnClick, onNextBtnClick }: IProps) => {
  return (
    <StyledWrapper>

      <IconButton
        aria-label='left'
        colorScheme='blue'
        icon={<ChevronLeftIcon fontSize='30px' />}
        onClick={onPrevBtnClick}
      />

      <IconButton
        aria-label='right'
        colorScheme='blue'
        icon={<ChevronRightIcon fontSize='30px' />}
        onClick={onNextBtnClick}
      />

    </StyledWrapper>
  )
}

const StyledWrapper = chakra('div', {
  baseStyle: {
    display: 'flex',
    columnGap: '3px'
  }
})
