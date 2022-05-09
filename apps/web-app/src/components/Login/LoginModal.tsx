import React, { FC } from 'react'
import LoginGoogleButton from '~/components/Login/LoginGoogleButton'
import { Modal } from '~/components/UIBaseComponents/Modal/Modal'

interface LoginModalProps {
    isOpen: boolean
    onCloseModal: () => void
}

export const LoginModal: FC<LoginModalProps> = (props) => {

  return (
    <Modal onCloseModal={props.onCloseModal} isOpen={props.isOpen} title={'Přihlášení'}>
      <div className="mt-2">
        <p className="text-sm text-gray-500 mb-4">
                    Přihlásit se můžete pomocí svého účtu na Google.
        </p>
        <LoginGoogleButton/>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={props.onCloseModal}
        >
          <span>Zavřít</span>
        </button>
      </div>
    </Modal>
  )
}
