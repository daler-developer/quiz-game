import { MockedResponse } from '@apollo/client/testing'
import * as queries from '../../graphql/queries'

const mocks: MockedResponse[] = [
  {
    request: {
      query: queries.GET_ME,
    },
    result: {
      data: {
        getMe: {
          _id: 'id000001',
          username: 'test-daler'
        }
      }
    }
  }
]

export default mocks
