import { useQuery } from '@apollo/client'
import * as queries from '../graphql/queries'
import { IUser } from '../models'

interface IData {
  getMe: IUser
}

interface IVariables {
  token
}

export default () => {
  const query = useQuery<IData, IVariables>(queries.GET_ME, {
    variables: {

    }
  })

  return query
}
