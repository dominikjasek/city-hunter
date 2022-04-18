import React from 'react'
import { GoogleLoginButton } from "react-social-login-buttons"
// import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

// function LoginGoogleButton() {
// const [ loginData, setLoginData ] = useState(
//   localStorage.getItem('loginData')
//     ? JSON.parse(localStorage.getItem('loginData') || '{}')
//     : null
// )
//
// const handleFailure = (result: any) => {
//   alert(result)
// }

// const handleLogin = async (googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
//   if ('accessToken' in googleData) {
//     console.log(googleData)
//     const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/google-login`, {
//       method: 'POST',
//       body: JSON.stringify({
//         token: googleData.accessToken,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//
//     const data = await res.json()
//     setLoginData(data)
//     localStorage.setItem('loginData', JSON.stringify(data))
//   }
// }

// const handleLogout = () => {
//   localStorage.removeItem('loginData')
//   setLoginData(null)
// }

// return (
//   <div className="App">
//     <header className="App-header">
//       <h1>React Google Login App</h1>
//       <div>
//         {loginData ? (
//           <div>
//             <h3>You logged in as {loginData.email}</h3>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         ) : (
//           <GoogleLogin
//             clientId={import.meta.env.VITE_GOOGLE_AUTH_GOOGLE_CLIENT_ID}
//             buttonText="Přihlásit se pomocí Google"
//             onSuccess={handleLogin}
//             onFailure={handleFailure}
//             isSignedIn={true}
//             cookiePolicy={'single_host_origin'}
//           ></GoogleLogin>
//         )}
//       </div>
//     </header>
//   </div>
// )
// }

function LoginGoogleButton() {
  const handleGoogleLogin = () => {
    console.log('trying to google login')
    window.location.href = `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google-login`
  }
    
  return (
    // @ts-ignore
    <GoogleLoginButton onClick={() => handleGoogleLogin()}>
      <span>Přihlásit se pomocí Google</span>
    </GoogleLoginButton>
  )
}

export default LoginGoogleButton