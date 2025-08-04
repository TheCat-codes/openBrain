import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../Store/store"
import type React from "react"
import { deleteAccount, editUserAction } from "../Actions/authActions"
import { toast } from "sonner"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function EditForm ({ setVisibleEdit }:{ setVisibleEdit:React.Dispatch<React.SetStateAction<boolean>> }) {
  const { user } = useSelector((state:RootState) => state.loginSlice)
  const [loading, setLoading]   = useState<boolean>(false)
  const [deleteForm, setDeleteForm] = useState<boolean>(false)

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()

    const form = e.currentTarget

    const formdata = new FormData(form)
    
    const email = formdata.get('email') as string
    const username = formdata.get('username') as string
    const name = formdata.get('name') as string
    const lastname = formdata.get('lastname') as string
    const startage = formdata.get('age') as string
    const id = user?.id
    const age = parseInt(startage)

    if(!id || !age || !username || !name || !lastname || !email) return  setLoading(false)

    await editUserAction({email, username, name, lastname, age, id })
      .then(() => {
        setVisibleEdit(false)
        toast.success('Refresh to see the changes')
      })
      .catch(() => setLoading(false))
  }
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleDeleteAccount = () => {
    if(!user) return navigate('/')
    dispatch(deleteAccount(user?.id))
  }

  return (
    <form id="form" className="edit-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="edit-div">
        <label htmlFor="edit-username">username</label>
        <input name="username" id="edit-username" type="text" defaultValue={user?.username} />
      </div>
      <div className="edit-div">
        <label htmlFor="edit-name">Name</label>
        <input type="text" name="name" id="edit-name" defaultValue={user?.name} />
      </div>
      <div className="edit-div">
        <label htmlFor="edit-lastname">Lastname</label>
        <input type="text" name="lastname" id="edit-lastname" defaultValue={user?.lastname} />
      </div>
      <div className="edit-div">
        <label htmlFor="edit-age">Age</label>
        <input type="number"id="edit-age" name="age" defaultValue={user?.age} />
      </div>
      <div className="edit-div">
      <label htmlFor="edit-email">Email</label>
      <input type="text" id="edit-email" name="email" defaultValue={user?.email} />
      </div>
      <div className="edit-options">
        <button type='submit' className="send-edited">Save</button>
        <button className="close-edit" onClick={() => setVisibleEdit(false)}>Cancel</button>
      </div>
      <button onClick={() => setDeleteForm(true)} className="delete-account-button" type='button'>Delete account 
        <svg width={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="delete-icon">
          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
        </svg>
      </button>
      <p className="edit-loading">{loading ? 'loading...' : 'Waiting changes...'}</p>
      {deleteForm  && (
        <div className="delete-account-confirm">
          <p>Are you gonna delete this account?</p>
          <span>You won't recover nothing</span>
          <div className="delete-account-options">
            <button onClick={handleDeleteAccount} type="button" className="confirm-delete-account">
              Yes
              <svg width={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="delete-icon">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
              </svg>
            </button>
            <button type="button" className="cancel-delete-account" onClick={() => setDeleteForm(false)}>
              No
              <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
            </button>
          </div>
        </div>
      )}
    </form>
  )
}