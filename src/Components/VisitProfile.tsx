import { useEffect, useState } from "react"
import { getComments, getLikes, getPosts } from "../Actions/postsActions"
import type { User } from "../Slices/authSlices"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../Store/store"
import { Actions } from "./Actions"
import { CommentsView } from "./CommentsView"

export function VisitProfile () {
  const visitedUser = localStorage.getItem('visitedUser') as string
  const user = JSON.parse(visitedUser) as User

  const [commentsVisible, setCommentsVisible] = useState<boolean>(false)
  const [imageVisible, setImageVisible] = useState<boolean>(false)
  const [postId, setPostId] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getComments())
    dispatch(getLikes())
    dispatch(getPosts())
  },[])

  const { posts } = useSelector((state:RootState) => state.postSlice)

  const filteredPosts = posts.filter(post => post.creator === user.id)
  
  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      gap:'10px',
      width:'100%'
    }}>
      {imageVisible  && (
        <>
          <div className="foreign-image-view">
            <svg width={24} onClick={() => setImageVisible(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="close-foreign">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
            <img src={user.img} className="foreign-view-img"/>
          </div>
        </>
      )}
      { commentsVisible && <CommentsView setCommentsVisible={setCommentsVisible} postId={postId}/> }
      <div className="foreign-user-data">
        <img onClick={() => setImageVisible(true)} className="foreign-img" width={100} src={user.img} alt="" />
        <div className="foreign-identifiers">
          <strong>{user.name} {user.lastname}</strong>
          <strong className="username-identifier">@{user.username}</strong>
        </div>
      </div>
      <div className="list-results">
        <ul>
        { 
          filteredPosts.map((post) => {
            return (
              <li key={post.id} className="post">
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
    </div>
  )
}