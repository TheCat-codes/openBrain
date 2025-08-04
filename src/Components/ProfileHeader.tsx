import { MenuIcon } from "./icons"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../Store/store"
import { LOGOUT } from "../routes"
import { logout, setLoading } from "../Slices/authSlices.ts"
import { Link } from "./Link.tsx"
import React, { useState } from "react"
import { createPost, getPosts } from "../Actions/postsActions.tsx"
import { toast } from "sonner"
import { EditForm } from "./editForm.tsx"

export function ProfileHeader () {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [imgView, setImgview] = useState<boolean>(false)
  const [visibleNew, setVisibleNew] = useState<boolean>(false)
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false)
  const [visibleEditImage, setVisibleEditImage] = useState<boolean>(false)
  const [loadingImage, setLoadingImage] = useState<boolean>(false)

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

  const { loading } = useSelector((state:RootState) => state.postSlice)
  const { user } = useSelector((state:RootState) => state.loginSlice)

  const handleNewPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(setLoading())

    const form = event.currentTarget
    const formData = new FormData(form)

    const text = formData.get('text') as string
    const img = formData.get('image') as File || null
    const id = user?.id as string

    if(img.size !== 0) {
      if(!img.type.startsWith('image/')) {
        toast.error('please send and image')
        form.reset()
        return
      }
    }

    await dispatch(createPost({ text, img, id}))
    setVisibleNew(false)
    dispatch(getPosts())
    form.reset()
  }

  const handleImageEdit = async (e:React.FormEvent<HTMLFormElement>) => {
    setLoadingImage(true)
    e.preventDefault()
    const form = e.currentTarget
    const formdata = new FormData(form)
    const img = formdata.get('image')  as File
    if(!user) return
    formdata.append('id', user?.id)

    if(img.size === 0 || !img.type.startsWith('image/')){
      form.reset()
      setLoadingImage(false)
      return toast.error('file must be an image')
    }

    try {
      const res = await fetch('http://localhost:4000/api/editImage', {
      method: 'POST',
      credentials:  'include',
      body: formdata
    })

    if(!res.ok) {
      setLoadingImage(false)
      return toast.error('Sorry, try later...')
    }

    setLoadingImage(false)
    toast.success('Refresh to see the changes')
    } catch (e) {
      console.log(e)
      setLoadingImage(false)
    }
  }

  return (
    <>
      { visibleNew && (
        <div className="new-post">
          <h2>New Post</h2>
          <form id="new-form" encType="multipart/form-data" onSubmit={handleNewPost}>
            <textarea className="newtext" name="text" placeholder="What's on your mind?"></textarea>
            <input className="photo" type="file" name="image"/>
            <button className="post-button" type="submit">Post</button>
            <button className="cancel-button" onClick={() => setVisibleNew(false)}>Close</button>
          </form>
          { loading && <h2>loading...</h2>}
        </div>
      )}
      {visibleEditImage && (
        <form onSubmit={handleImageEdit} id="image-form" encType="multipart/form-data">
          <input name="image" type="file" />
          <button className="close-img-edit" onClick={() => setVisibleEditImage(false)}>
            <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="">
              <path fill="#f00" fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
          <button type="submit">Change</button>
          {loadingImage && <p className="image-loading">loading...</p>}
        </form>
      )}
      { imgView && (
        <div className="img-view">
          <img src={user?.img} alt="" />
          <div className="img-options">
            <svg onClick={() => setVisibleEditImage(true)} width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>
            <svg width={24} onClick={() => setImgview(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="close-img">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
      {visibleEdit && (
        <EditForm setVisibleEdit={setVisibleEdit} />
      ) }
      <header className="header">
        <nav className="nav-bar">
          <div className="profile-header">
          <div className="img-name">
            <img onClick={() => {
              setImgview(true)
              setVisibleNew(false)
            }} src={user?.img} alt="" />
            <div className="user-name">
              <h2>{user?.name} {user?.lastname}</h2>
              <span>@{user?.username}</span>
            </div>
              <button onClick={() => setVisibleEdit(!visibleEdit)} className="open-editor">
                <svg width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
              </button>
            </div>
          </div>
          <label htmlFor="check" className="open-options"><MenuIcon /></label>
          <input className="check-box" type="checkbox" id="check"/>
          <div className="list-container">
            <ul className="list">
              <li className="list-item">
                <button onClick={() => setVisibleNew(true)}>
                  <svg width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
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
              <li className="list-item"><button><Link target={undefined} to="/" destiny="Welcome"/></button></li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}