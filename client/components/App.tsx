import { useEffect, useLayoutEffect, useState } from "react"
import FullScreenLoader from './FullScreenLoader'
import useGetMeQuery from "../hooks/useGetMeQuery"
import useGetMeLazyQuery from "../hooks/useGetMeLazyQuery"

interface IProps {
  children: any
}

export default ({ children }: IProps) => {
  const [isFullScreenVisible, setIsFullScreenVisible] = useState(true)

  const [getMe] = useGetMeLazyQuery()

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('auth-token')) {
        await getMe()
      }
      setIsFullScreenVisible(false)
    })()
  }, [])

  if (isFullScreenVisible) {
    return <FullScreenLoader />
  }

  return children
}
