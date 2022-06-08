import useGetMeQuery from './useGetMeQuery'

export default () => {
  const { data } = useGetMeQuery()
  
  return !!data
}
