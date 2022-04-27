import React from 'react'
import { Link } from "react-router-dom"
import LoginGoogleButton from "~/src/components/LoginGoogleButton"

const Home = () => {
  return (
    <div>
      {/* <img src={logo} className="app-logo" alt="logo"/> */}
      <LoginGoogleButton />
      <Link to={`/about`}>About</Link>
    </div>
  )
}

export default Home
