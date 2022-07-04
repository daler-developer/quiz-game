import { useRouter } from "next/router"
import { useEffect, useLayoutEffect } from "react"
import useGetMeLazyQuery from "../hooks/useGetMeLazyQuery"
import useIsLoggedIn from "../hooks/useIsLoggedIn"

export default ({ children }: any) => {
  const isLoggedIn = useIsLoggedIn()

  const router = useRouter()

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth?tab=login')
    }
  }, [])

  if (!isLoggedIn) {
    return null
  }

  return children
}
