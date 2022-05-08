import React from 'react'
import NavigationMenuAuthHandler
  from '~/components/Navigation/NavigationMenu/NavigationMenuItem/NavigationMenuAuthHandler'
import NavigationMenuItem, {
  NavigationMenuItemProps
} from '~/components/Navigation/NavigationMenu/NavigationMenuItem/NavigationMenuItemLink'

interface Props {
    isNavbarOpen: boolean
}

export default function NavigationMenu(props: Props) {
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
  ]

  return (
    <div
      className={'md:flex flex-grow items-center' + (props.isNavbarOpen ? ' flex' : ' hidden')}
      id="example-navbar-danger"
    >
      <ul className="flex flex-col mt-4 md:flex-row list-none md:ml-auto">
        {
          navigationMenuItems.map(item => <NavigationMenuItem key={item.label} to={item.to}
            label={item.label}/>)
        }
        <NavigationMenuAuthHandler/>
      </ul>
    </div>
  )
}
