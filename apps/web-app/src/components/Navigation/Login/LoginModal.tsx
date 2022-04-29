import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import LoginGoogleButton from '~/src/components/LoginGoogleButton'

interface LoginModalProps {
    isOpen: boolean
    onCloseModal: () => void
}

export default function LoginModal(props: LoginModalProps) {

  const [ isShowing, setIsShowing ] = useState(false)

  useEffect(() => {
    setIsShowing(props.isOpen)
  }, [ props.isOpen ])

  const closeModal = () => {
    setIsShowing(false)
    props.onCloseModal()
  }

  return (
    <Transition appear show={isShowing} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0"/>
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
              &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition-all ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Přihlášení
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                                    Your payment has been successfully submitted. We’ve sent you
                                    an email with all of the details of your order.
                </p>
                <LoginGoogleButton/>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                                    Ok!
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>

  )
}
