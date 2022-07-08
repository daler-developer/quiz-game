import { screen } from "@testing-library/react"
import Container from "../../components/Container"
import { customRender } from "../utils"

describe('<Container />', () => {

  test('should render correctly', () => {
    customRender((
      <Container>
        Inner content
      </Container>
    ))
  })

  test(`'children' prop should be injected`, () => {
    customRender((
      <Container>
        <div>
          Inner content
        </div>
      </Container>
    ))

    expect(screen.queryByText('Inner content')).toBeInTheDocument()
  })

})