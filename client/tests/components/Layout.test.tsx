import { screen } from "@testing-library/react"
import Layout from "../../components/Layout"
import { customRender } from "../utils"

describe('<Layout />', () => {

  test('should render', () => {
    customRender(<Layout children={''} />)
  })

  test(`'children' prop should be injected`, () => {
    customRender(<Layout children={<div>Injected content</div>} />)

    expect(screen.queryByText('Injected content')).toBeInTheDocument()
  })

})
