import type React from "react"
import { useState } from "react"
import { REGISTER_API } from "../routes"

export function RegisterForm () {
  const [msg, setMsg] = useState('')
  const [positive, setPositive] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault()

    const form = event.currentTarget
    const formdata = new FormData(form)

    const img = formdata.get('image') as File
    const age = formdata.get('age')

    if(!age) {
      setLoading(false)
      return setMsg('Enter an age')
    }

    if(img.size > 0) {
      if(!img.type.startsWith('image/') || img.size === 0) {
        setLoading(false)
        return setMsg('file must be of type image')
      }
    }

    try {
      const res = await fetch(REGISTER_API, {
        method: 'POST',
        credentials: 'include',
        body: formdata
      })

      const data = await res.json()

      if(!res.ok) {
        console.log(data)
        setLoading(false)
        return setMsg(data.message)
      }

      setLoading(false)
      setPositive(data.message)
      setMsg('')
      form.reset()
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  return (
    <form id="register_form" encType="multipart/form-data" onSubmit={handleRegister}>
      <h2>Register your user</h2>
      <input type="text" name="name" placeholder="Enter your name"/>
      <input type="text" name="lastname" placeholder="Enter your lastname"/>
      <input type="text" name="email" placeholder="Enter your email"/>
      <input type="text" name="username" placeholder="enter your username"/>
      <input type="password" name="password" placeholder="Enter your password"/>
      <input type="number" step="any" name="age" placeholder="Enter your age"/>
      <input type="file" name="image"/>
      <button type="submit">Register</button>
      <a href="/login">Log-in</a>
      <p className="error">{msg}</p>
      <p className="message">{positive}</p>
      {loading && <p className="message">loading...</p>}
    </form>
  )
}