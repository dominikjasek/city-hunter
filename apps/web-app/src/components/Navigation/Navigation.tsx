import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '~/assets/Logo.svg'
import NavigationMenu from '~/components/Navigation/NavigationMenu/NavigationMenu'
import './navigation.scss'

export default function Navigation() {
  const [ navbarOpen, setNavbarOpen ] = useState(false)

  return (
    <nav className="relative w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between px-2 py-5 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
          <Link
            className="flex items-center"
            to="/"
          >
            <img src={logo} className="app-logo max-h-14 mr-4" alt="HledejBrno-logo"/>
            <span className="font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white">
              Hledej Brno
            </span>
          </Link>

          <button data-collapse-toggle="mobile-menu" type="button"
            className="inline-flex my-auto items-center p-2 ml-3 text-sm rounded-lg md:hidden hover:bg-gray-100/20 focus:outline-none focus:ring-2 focus:ring-gray-200  "
            aria-controls="mobile-menu" aria-expanded="false"
            onClick={() => setNavbarOpen(!navbarOpen)}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        <NavigationMenu
          isNavbarOpen={navbarOpen}
        />
      </div>
    </nav>
  )
}
