import type React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../Actions/authActions"
import type { AppDispatch, RootState } from "../Store/store"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "./Link"

export function LoginForm () {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const navigate = useNavigate()
  const { error, loading, user } = useSelector((state:RootState) => state.loginSlice)
  const dispatch = useDispatch<AppDispatch>()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  useEffect(() => {
    if(user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

    return (
      <>
        <form id="login-form" onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <input onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="username" />
          <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="password"/>
          <button type='submit'>Login</button>
          <p className="error">
            {error !== null ? error : ''}
            { loading && <span>loading...</span>}
          </p>
          <Link to="/register" destiny="Register here" target={undefined} />
        </form>
      </>
    )
}