import { Link } from "react-router-dom"

export default function About() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>About</h2>
      <Link to={`/`}>Go home</Link>
    </main>
  )
}
