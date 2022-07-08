import { Box, chakra, IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface IProps {
  onNextBtnClick: Function
  onPrevBtnClick: Function
  hasNext: boolean
  hasPrev: boolean
  sx?: object
}

export default ({ onPrevBtnClick, onNextBtnClick, hasPrev, hasNext, sx }: IProps) => {
  return (
    <Box sx={{ display: 'flex', columnGap: '3px', ...sx }} role="pagination">

      <IconButton
        aria-label='left'
        colorScheme='blue'
        icon={<ChevronLeftIcon fontSize='30px' />}
        onClick={onPrevBtnClick as any}
        isDisabled={!hasPrev}
        role="pagination-prev-btn"
      />

      <IconButton
        aria-label='right'
        colorScheme='blue'
        icon={<ChevronRightIcon fontSize='30px' />}
        onClick={onNextBtnClick as any}
        isDisabled={!hasNext}
        role="pagination-next-btn"
      />

    </Box>
  )
}
