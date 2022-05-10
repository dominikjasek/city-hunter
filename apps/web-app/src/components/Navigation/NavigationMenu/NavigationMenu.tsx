import { Transition } from '@headlessui/react'
import React, { FC } from 'react'
import NavigationMenuAuthHandler
  from '~/components/Navigation/NavigationMenu/NavigationMenuItem/NavigationMenuAuthHandler'
import {
  NavigationMenuItem,
  NavigationMenuItemProps
} from '~/components/Navigation/NavigationMenu/NavigationMenuItem/NavigationMenuItemLink'
import { useWindowDimensions } from '~/infrastructure/window/windowDimensions'

interface Props {
    isOpenForMobile: boolean
}

export const NavigationMenu: FC<Props> = (props: Props) => {
  const navigationMenuItems: NavigationMenuItemProps[] = [
    {
      to: '/hrat',
      label: 'Hrát',
    },
    {
      to: '/skore',
      label: 'Skóre',
    },
    {
      to: '/pravidla',
      label: 'Pravidla',
    },
    {
      to: '/pridat-misto',
      label: 'Přidat místo',
    },
  ]

  const { isMd } = useWindowDimensions()

  if (isMd) {
    return (
      <div className={'md:flex flex-grow items-center'}>
        <ul className="flex flex-col md:w-auto md:flex-row list-none md:ml-auto">
          {
            navigationMenuItems.map(item =>
              <NavigationMenuItem key={item.label} to={item.to}
                label={item.label}
              />)
          }
          <NavigationMenuAuthHandler/>
        </ul>
      </div>
    )
  }

  return (
    <Transition
      show={props.isOpenForMobile}
      enter="transform transition-all ease-out duration-75"
      enterFrom="opacity-0 h-0 "
      enterTo={'opacity-100 h-[201px] '}
      leave="transition-all duration-75"
      leaveFrom="opacity-100 h-[201px] "
      leaveTo="opacity-0 h-0 "
      className="transform flex-grow w-full items-center overflow-hidden"
    >
      <ul className="flex flex-col mt-4 w-full list-none -z-10">
        {
          navigationMenuItems.map(item =>
            <NavigationMenuItem key={item.label} to={item.to}
              label={item.label}
            />)
        }
        <NavigationMenuAuthHandler/>
      </ul>
    </Transition>

  )
}
