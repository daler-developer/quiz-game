import { screen } from "@testing-library/react"
import AuthProtected from "../../components/AuthProtected"
import { customRender } from "../utils"

describe('<AuthProtected />', () => {

  test('should render correctly', () => {
    customRender((
      <AuthProtected>
        <div>Inner content</div>
      </AuthProtected>
    ))
  })

  test(`'children' prop should be injected`, () => {
    customRender((
      <AuthProtected>
        <div>Inner content</div>
      </AuthProtected>
    ))

    console.log(screen.debug())
  })  

})