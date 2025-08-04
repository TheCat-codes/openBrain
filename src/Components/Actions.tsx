import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../Store/store"
import { dislike, getPosts, like } from "../Actions/postsActions"
import { toast } from "sonner"
import type React from "react"

type Prop = React.Dispatch<React.SetStateAction<boolean>>

export function Actions ({post_id, text, setCommentsVisible, setPostId}: {post_id: string, text: string, setCommentsVisible: Prop, setPostId:React.Dispatch<React.SetStateAction<string>>}) {
  const dispatch = useDispatch<AppDispatch>()

  const  { user } = useSelector((state:RootState) => state.loginSlice)
  const { likes } = useSelector((state:RootState) => state.likesSlice)

  const isLiked = likes.some(like => like.post_id === post_id && like.user_id === user?.id)
  const className = isLiked ? 'like liked' : 'like'

  const likePost = async () => {
    if(user === undefined || user === null) return
    if (isLiked){
      await dispatch(dislike(post_id, user.id))
      await dispatch(getPosts())
      return
    }
    await dispatch(like(post_id, user.id))
    await dispatch(getPosts())
  }

  const copyPost = () => {
    navigator.clipboard.writeText(text)
    toast.success('copied to the clipboard!')
  }
  
  return (
    <>
      <div className="actions-section">
        <button className={className} onClick={likePost}>
          <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="like-svg">
            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
          </svg>
        </button>
        <button className="comment-button" onClick={() => {
          setCommentsVisible(true)
          setPostId(post_id)
        }}>
          <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="copyText" onClick={copyPost}>
          <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
          </svg>
        </button>
      </div>
    </>
  )
}
