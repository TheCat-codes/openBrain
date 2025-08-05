import { MenuIcon } from "./icons"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../Store/store"
import { LOGOUT } from "../routes"
import { logout } from "../Slices/authSlices.ts"
import { Link } from "./Link.tsx"

export function VisitHeader () {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const logoutAccount = () => {
    try {
      fetch(LOGOUT, {
        method:'POST',
        credentials: 'include'
      })
        .then(async res => {
          if(res.ok) {
            dispatch(logout())
            return navigate('/')
          }
        })
        .catch(e => console.log(e.message))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <header className="header">
        <nav className="nav-bar">
          <div className="app-logoname">
            <img className="nav-logo" src="https://www.pngmart.com/files/21/Brain-Transparent-Isolated-Background.png" alt="" />
            <h2>openBrain</h2>
          </div>
          <label htmlFor="check" className="open-options"><MenuIcon /></label>
          <input className="check-box" type="checkbox" id="check"/>

          <div className="list-container">
            <ul className="list">
              <li className="list-item">
                <button onClick={() => navigate('/dashboard')}>
                  <Link target={undefined} to="/dashboard" destiny="Home" />
                </button>
              </li>
              <li className="list-item">
                <button onClick={logoutAccount}>
                  <span>Log-out</span>
                </button>
              </li>
              <li className="list-item"><button onClick={() => navigate('/')}>
                <Link target={undefined} to="/" destiny="Welcome"/>
              </button></li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}