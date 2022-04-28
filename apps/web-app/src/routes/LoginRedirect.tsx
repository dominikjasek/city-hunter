import axios from "axios"
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

const LoginRedirect = () => {
  const [ data, setData ] = useState<string>('')
  const [ searchParams ] = useSearchParams()
  const jwt = searchParams.get("access_token")
  console.log(jwt)

  const fetchProtectedData = async () => {
    console.log(jwt)
    const val = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/protected`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

    console.log(val.data.data)
    setData(val.data.data)

  }

  return (
    <main style={{ padding: "1rem 0" }}>
      <button onClick={fetchProtectedData}>Fetch data</button>
      <ul>
        {
          data
        }
      </ul>
      <Link to={`/`}>Go home</Link>
    </main>
  )
}

export default LoginRedirect