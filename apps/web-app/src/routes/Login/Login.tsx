import React from 'react'
import { BaseButton } from '~/components/UIBaseComponents/Button/BaseButton'
import { useAuth } from '~/infrastructure/auth/UseAuth'

export const Login = () => {
  const { loginWithRedirect } = useAuth()

  return (
    <div className={'flex flex-col'}>
      <span>Abyste mohli pokračovat, musíte se přihlásit.</span>
      <BaseButton
        className={'mt-4 py-3 mx-auto w-[300px] uppercase text-2xl'}
        onClick={loginWithRedirect}
      >
        <span>Přihlásit se</span>
      </BaseButton>
    </div>
  )
}