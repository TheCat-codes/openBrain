// import { useRef } from "react"
import type { RootState } from "../Store/store"
import { useSelector, useDispatch } from "react-redux"
import type { AppDispatch } from "../Store/store"
import { useEffect } from "react"
import { getLikes, getPosts, deletePostDatabase, getComments } from "../Actions/postsActions"
import { Actions } from "./Actions"
import { useState } from "react"
import { CommentsView } from "./CommentsView"

export function Profile () {
  // const { user } = useSelector((state:RootState) => state.loginSlice)
  // const profileRef = useRef<HTMLDivElement>(null)

  // const scrollToProfileTop = () => {
  //   profileRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }

  const { posts } = useSelector((state:RootState) => state.postSlice)
  const { user } = useSelector((state:RootState) => state.loginSlice)
  const [removeOption, setRemoveOption] = useState<boolean>(false)
  const [postToRemove, setPostToRemove] = useState<string | null>(null)
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false)
  const [postId, setPostId] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getComments())
    dispatch(getPosts())
    dispatch(getLikes())
  },[])

  const userPosts = posts.filter( post => post.creator === user?.id)

  const deletePost = async () => {
    if(postToRemove === null) return
    await dispatch(deletePostDatabase(postToRemove))
    setRemoveOption(false)
  }

  if(userPosts.length === 0) return <h2>No availables posts</h2>


  return (
    <>
    {
      removeOption && 
      <div className="remove-option">
        <h2>Are you sure you want to delete this post?</h2>
        <div className="delete-options">
          <button className="close-delete-form" onClick={() => setRemoveOption(false)}>Cancel</button>
          <button className="delete-post-button" onClick={deletePost}>Delete</button>
        </div>
      </div>
    }
    <div className="list-results">
      <ul>
      { commentsVisible && <CommentsView setCommentsVisible={setCommentsVisible} postId={postId}/> }
      { 
        userPosts.map((post) => {
          return (
            <li key={post.id} className="post">
              <div className="post-menu">
                <div className="delete">
                  <svg onClick={() => {
                    setRemoveOption(true)
                    setPostToRemove(post.id)
                  }} width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="delete-icon">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="creator-data">
                <img src={post.user_image} alt="" title={post.user_image} />
                <div className="name-created">
                  <strong>{post.username}</strong>
                  <span>{ new Date(post.created_at).toLocaleString() }</span>
                </div>
              </div>
              <div className="post-content">
                <p className="post-text">{post.text}</p>
                {post.img && <img className="post-img" src={post.img} alt="Post image" />}
              </div>
              <div className="counts" onClick={() => {
                  setPostId(post.id)
                  setCommentsVisible(true)
                }}>
                  <span className="likes">
                    <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="like-svg">
                      <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                    </svg>
                    {post.post_likes}</span>
                  <span>{post.post_comments} comments</span>
                </div>
              <Actions setPostId={setPostId} setCommentsVisible={setCommentsVisible} post_id={post.id} text={post.text}/>
            </li>
          )
        })
      }
    </ul>
    </div>
    </>
  )
}