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

  if (isMd) {
    return (
      <div className={'md:flex flex-grow items-center'}>
        <ul className="flex flex-col md:w-auto md:flex-row list-none md:ml-auto">
          {
            navigationMenuItems.map(item =>
              <NavigationMenuItem key={item.label} to={item.to} label={item.label}
                authRequired={item.authRequired}/>)
          }
          <NavigationMenuAuthHandler/>
        </ul>
      </div>
    )
  }

  if (!props.isOpenForMobile) {
    return <></>
  }

  return (
    <div className='w-full items-center overflow-hidden'>
      <ul className="flex flex-col mt-4 w-full list-none -z-10">
        {
          navigationMenuItems.map(item =>
            <NavigationMenuItem
              key={item.label}
              to={item.to}
              label={item.label}
              authRequired={item.authRequired}/>
          )
        }
        <NavigationMenuAuthHandler/>
      </ul>
    </div>

  )
}
