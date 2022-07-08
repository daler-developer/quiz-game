import { screen } from '@testing-library/react'
import Pagination from '../../components/Pagination'
import { customRender } from '../utils'
import userEvent from '@testing-library/user-event'

describe('<Pagination />', () => {

  test('should be in the document', () => {
    customRender((
      <Pagination 
        hasNext={true}
        hasPrev={true}
        onNextBtnClick={() => {}}
        onPrevBtnClick={() => {}}
      />
    ))

    expect(screen.getByRole('pagination')).toBeInTheDocument()
  })

  test('prev and next btns should be disabled', () => {
    customRender((
      <Pagination
        hasNext={false}
        hasPrev={false}
        onNextBtnClick={() => {}}
        onPrevBtnClick={() => {}}
      />
    ))

    expect(screen.getByRole('pagination-prev-btn')).toBeDisabled()
    expect(screen.getByRole('pagination-next-btn')).toBeDisabled()
  })
  
  test('prev and next btns should not be disabled', () => {
    customRender((
      <Pagination
        hasNext={true}
        hasPrev={true}
        onNextBtnClick={() => {}}
        onPrevBtnClick={() => {}}
      />
    ))
  
    expect(screen.getByRole('pagination-prev-btn')).not.toBeDisabled()
    expect(screen.getByRole('pagination-next-btn')).not.toBeDisabled()
  })

  test('callbacks should be called when clicking next and prev buttons', async () => {
    const user = userEvent.setup()

    const handlePrevBtnClick = jest.fn()
    const handleNextBtnClick = jest.fn()
    
    customRender((
      <Pagination
        hasNext={true}
        hasPrev={true}
        onNextBtnClick={handleNextBtnClick}
        onPrevBtnClick={handlePrevBtnClick}
      />
    ))

    await user.click(screen.getByRole('pagination-prev-btn'))
    await user.click(screen.getByRole('pagination-next-btn'))

    expect(handlePrevBtnClick).toHaveBeenCalledTimes(1)
    expect(handleNextBtnClick).toHaveBeenCalledTimes(1)
  })

})
