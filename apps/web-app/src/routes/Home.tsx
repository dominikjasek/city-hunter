import React, { useState } from 'react'
import { Link } from "react-router-dom"
import LoginGoogleButton from "~/src/components/LoginGoogleButton"
import logo from "~/src/logo.svg"

const Home = () => {
  const [ count, setCount ] = useState(0)

  return (
    <div>
      <img src={logo} className="app-logo" alt="logo"/>
      <p>Hello Vite + React!</p>
      <LoginGoogleButton />
      <Link to={`/about`}>About</Link>
      <p>

        <button type="button" onClick={() => setCount((count) => count + 1)}>
                    count is:
          {' '}
          {count}
        </button>
      </p>

      <p> Edit
        {' '}
        <code>App.tsx</code>
        {' '}
                and save to test HMR updates.
      </p>
      <p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
                    Learn React
        </a>
        {' | '}
        <a
          className="app-link"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
                    Vite Docs
        </a>
      </p>
    </div>
  )
}

export default Home