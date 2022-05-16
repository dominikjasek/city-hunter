import { Popover, Transition } from '@headlessui/react'
import React, { FC, Fragment, ReactNode } from 'react'

interface IProps {
    onClose?: () => void
    className?: string
    button: ReactNode
    panel: ReactNode
}

export const BasePopover: FC<IProps> = (props) => {
  return (
    <Popover className={`relative ${props.className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? '' : 'text-opacity-90'}
                ${props.className}`}
          >
            {props.button}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="absolute left-1/2 z-10 mt-3 max-w-sm -translate-x-1/2 transform px-4 sm: px-0">
              <div className="overflow-hidden rounded shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative">
                  {props.panel}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}