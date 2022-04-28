import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const Modal = () => {
  let [ isOpen, setIsOpen ] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
                    Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>

      </Transition>

    </>
  )
}

export default Modal