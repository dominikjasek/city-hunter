import React, { FC } from 'react'
import NavigationMenuAuthHandler
  from '~/components/Navigation/NavigationMenu/NavigationMenuItem/NavigationMenuAuthHandler/NavigationMenuAuthHandler'
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
      authRequired: false
    },
    {
      to: '/skore',
      label: 'Skóre',
      authRequired: false

    },
    {
      to: '/pravidla',
      label: 'Pravidla',
      authRequired: false

    },
    {
      to: '/pridat-misto',
      label: 'Přidat místo',
      authRequired: true
    },
    {
      to: '/spravovat-navrhy',
      label: 'Návrhy',
      authRequired: true,
      adminRequired: true
    },
  ]

  const { isMd } = useWindowDimensions()

  if (!props.isOpenForMobile && !isMd) {
    return <></>
  }

  return (
    <div
      className='w-full items-center overflow-hidden md:overflow-visible md:w-auto md:flex'>
      <ul className="flex flex-col mt-4 w-full list-none md:mt-0 md:flex md:w-auto md:flex-row md:list-none md:ml-auto">
        {
          navigationMenuItems.map(item =>
            <NavigationMenuItem
              key={item.label}
              to={item.to}
              label={item.label}
              authRequired={item.authRequired}
              adminRequired={item.adminRequired}
            />
          )
        }
        <NavigationMenuAuthHandler/>
      </ul>
    </div>

  )
}
