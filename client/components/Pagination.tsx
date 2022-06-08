import { chakra, IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface IProps {
  onNextBtnClick: Function
  onPrevBtnClick: Function
  hasNext: boolean
  hasPrev: boolean
}

export default ({ onPrevBtnClick, onNextBtnClick, hasNext, hasPrev }: IProps) => {
  return (
    <StyledWrapper>

      <IconButton
        aria-label='left'
        colorScheme='blue'
        icon={<ChevronLeftIcon fontSize='30px' />}
        onClick={onPrevBtnClick}
        isDisabled={!hasPrev}
      />

      <IconButton
        aria-label='right'
        colorScheme='blue'
        icon={<ChevronRightIcon fontSize='30px' />}
        onClick={onNextBtnClick}
        isDisabled={!hasNext}
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
