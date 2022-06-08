import { useQuery } from "@apollo/client"
import * as queries from '../graphql/queries'
import { IQuiz } from "../models"

interface IData {
  getQuizes: {
    quizes: Array<IQuiz>
  }
  numPages: number
}

interface IVariables {
  page: number
}

export default () => {
  const query = useQuery<IData, IVariables>(queries.GET_QUIZES, {
    variables: {
      page: 1
    }
  })

  return query
}
