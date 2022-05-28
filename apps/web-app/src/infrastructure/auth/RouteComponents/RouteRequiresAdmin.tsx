import React, { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

type IProps = PropsWithChildren<any>

export const RouteAdmin: FC<IProps> = (props) => {
  // const {}=useAuth0()

  return (
    true ? props.children : <Navigate to="/login"/>
  )
}
