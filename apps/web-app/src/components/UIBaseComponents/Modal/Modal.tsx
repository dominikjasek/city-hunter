import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react'

interface LoginModalProps {
    isOpen: boolean
    onCloseModal: () => void
    title: string
    children: ReactNode
}

export const Modal: FC<LoginModalProps> = (props) => {

  const [ isOpenedInternal, setIsOpenedInternal ] = useState(false)

  useEffect(() => {
    setIsOpenedInternal(props.isOpen)
  }, [ props.isOpen ])

  const closeModal = () => {
    setIsOpenedInternal(false)
    props.onCloseModal()
  }

  return (
    <Transition appear show={isOpenedInternal} as={Fragment}>
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
              {props.children}

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
