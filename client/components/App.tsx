import { useEffect, useLayoutEffect, useState } from "react"
import FullScreenLoader from './FullScreenLoader'
import useGetMeLazyQuery from "../hooks/useGetMeLazyQuery"
import { useRouter } from "next/router"
import useGetMeQuery from "../hooks/useGetMeQuery"

interface IProps {
  children: any
}

export default ({ children }: IProps) => {
  const getMeQuery = useGetMeQuery()

  if (getMeQuery.loading) {
    return <FullScreenLoader />
  }

  return children
}
