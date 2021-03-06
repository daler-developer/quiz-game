import { useLazyQuery } from '@apollo/client'
import * as queries from '../graphql/queries'
import { IUser } from '../models'

interface IData {
  getMe: IUser
}

interface IVariables {}

export default () => {
  const query = useLazyQuery<IData, IVariables>(queries.GET_ME)

  return query
}
