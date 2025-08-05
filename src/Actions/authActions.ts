import { toast } from 'sonner'
import { setError, setLoading, setUser} from '../Slices/authSlices.ts'
import type { AppDispatch } from '../Store/store.ts'
import { DELETE, EDIT, GETPROFILE, LOGIN_API } from '../routes.ts'

export const login = (username: string, password: string ) => async(dispatch: AppDispatch) => {
  dispatch(setLoading())
  try {
    const res = await fetch(LOGIN_API, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        username, 
        password
      })
    })

    const data = await res.json()

    if(!res.ok) {
      return dispatch(setError(data.message))
    }

    dispatch(setUser(data.user))
  } catch (e) {
    console.log(e)
    if (e instanceof Error) {
      dispatch(setError(e.message))
    } else {
      dispatch(setError('error in the fetch'))
    }
  }
}

export const getUserById = async ({creator}:{creator:string}) => {
  try {
    const res = await fetch(GETPROFILE +creator, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type':'application/json'}
    })

    const data = await res.json()

    if(!res.ok) {
      return
    }
    
    localStorage.setItem('visitedUser', JSON.stringify(data.user))
  } catch (e) {
    console.log(e)
  }
}

export const editUserAction = async (user:{id:string, username:string, lastname: string, name:string, age:number, email:string}) => {
  try {
    const res = await fetch(EDIT,{
      method:'POST',
      credentials: 'include',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(user)
    })

    if(!res.ok) {
      toast.error('try later')
      return
    }

    toast.success('Profile updated...')
  } catch (e) {
    console.log(e)
  }
}

export const deleteAccount = (id:string) => async (dispatch:AppDispatch) => {
  if(!id) return toast.error('no id provided')
  
  toast.success('Deleting account')
  try {
    const res = await fetch(DELETE+id, {
      method:'DELETE',
      credentials:'include'
    })

    const data = await res.json()

    if(!res.ok) {
      throw new Error(data.error)
    }

    dispatch(setUser(null))
    toast.success('Adios...')
    return data.message
  } catch (e) {
    console.log(e)
  }
}