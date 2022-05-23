import React, { useState } from 'react'
import { PrettyPrintJson } from '~/components/UIBaseComponents/Json/BaseJson'
import { useAuthRepository } from '~/infrastructure/ApiRepository/AuthRepository'

export const UserProfile = () => {
  const [ message, setMessage ] = useState({})
  const { getPing } = useAuthRepository()

  const callPingApi = async () => {
    const response = await getPing()
    setMessage(response)
  }

  return (
    <div>
      <button onClick={callPingApi}>Ping</button>
      <PrettyPrintJson data={message}/>
    </div>
  )
}