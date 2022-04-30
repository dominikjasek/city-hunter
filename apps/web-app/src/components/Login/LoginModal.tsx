import React from 'react'
import LoginGoogleButton from '~/src/components/Login/LoginGoogleButton'
import Modal from '~/src/components/UIBaseComponents/Modal/Modal'

interface LoginModalProps {
    isOpen: boolean
    onCloseModal: () => void
}

export const LoginModal = (props: LoginModalProps) => {

  return (
    <Modal onCloseModal={props.onCloseModal} isOpen={props.isOpen} title={'Přihlášení'}>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
                    Přihlásit se můžete pomocí svého účtu na Google.
        </p>
        <LoginGoogleButton/>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={props.onCloseModal}
        >
                    Ok!
        </button>
      </div>
    </Modal>
  )
}
