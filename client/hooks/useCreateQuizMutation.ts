import { useMutation } from "@apollo/client"
import { CREATE_QUIZ } from "../graphql/mutations"

export default () => {
  const mutation = useMutation(CREATE_QUIZ)
  
  return mutation
}
