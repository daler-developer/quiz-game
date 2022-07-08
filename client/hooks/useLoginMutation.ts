import { useMutation } from "@apollo/client"
import * as mutations from '../graphql/mutations'
import { errorAlert } from "../graphql/state"
import { IUser } from "../models"
import useGetMeLazyQuery from "./useGetMeLazyQuery"

interface IData {
  login: {
    token: string
    user: IUser
  }
}

interface IVariables {
  username: string
  password: string
}

export default () => {
  const [getMe] = useGetMeLazyQuery()

  const mutation = useMutation<IData, IVariables>(mutations.LOGIN, {
    onCompleted(data) {
      localStorage.setItem('auth-token', data.login.token)
      getMe()
    },
    onError({ graphQLErrors }) {
      errorAlert({ isOpen: true, messages: graphQLErrors })
    }
  })

  return mutation
}
