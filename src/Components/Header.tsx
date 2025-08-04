import { MenuIcon } from "./icons"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../Store/store"
import { LOGOUT } from "../routes"
import { logout } from "../Slices/authSlices.ts"
import { Link } from "./Link.tsx"

export function Header () {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const logoutAccount = () => {
    try {
      fetch(LOGOUT, {
        method:'POST',
        credentials: 'include'
      })
        .then(async res => {
          const data = await res.json()
          if(res.ok) {
            dispatch(logout())
            return navigate('/')
          }
          console.log(data)
        })
        .catch(e => console.log(e.message))
    } catch (e) {
      console.log(e)
    }
  }

  const { user } = useSelector((state:RootState) => state.loginSlice)

  return (
    <>
      <header className="header">
        <nav className="nav-bar">
          <div className="app-logoname">
            <img className="nav-logo" src="../../brainImg.png" alt="" />
            <h2>openBrain</h2>
          </div>
          <label htmlFor="check" className="open-options"><MenuIcon /></label>
          <input className="check-box" type="checkbox" id="check"/>

          <div className="list-container">
            <ul className="list">
              <li className="list-item">
                <button onClick={() => navigate('/dashboard/perfil')}>
                  <Link to='/dashboard/perfil' target={undefined} destiny="profile" />
                  <img className="profile-pic" src={user?.img} alt="" />
                </button>
              </li>
              <li className="list-item">
                <button onClick={logoutAccount}>
                  <span>Log-out</span>
                </button>
              </li>
              <li className="list-item"><button onClick={() => navigate('/')}><Link target={undefined} to="/" destiny="Welcome"/></button></li>
              <li className="list-item">
                <button className="search-redirect-button" onClick={() => navigate('/dashboard/search')}>
                  <svg width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                  </svg>
                  <span>Search</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}