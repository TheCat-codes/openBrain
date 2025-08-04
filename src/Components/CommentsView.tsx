import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../Store/store"
import type React from "react"
import { comment, getPosts } from "../Actions/postsActions"

type Prop = React.Dispatch<React.SetStateAction<boolean>>

export function CommentsView ({ postId , setCommentsVisible }:{postId:string, setCommentsVisible:Prop}) {
  const { user } = useSelector((state:RootState) => state.loginSlice)
  const { comments } = useSelector((state:RootState) => state.commentsSlice)
  const filteredComments = comments.filter(cm => cm.post_id === postId)
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    const formdata = new FormData(form)
    const commentText = formdata.get('comment') as string

    if (commentText.trim() === '' || user === undefined || user === null) {
      return
    }

    await dispatch(comment({postId, commentText, userId:user.id}))
    dispatch(getPosts())
    form.reset()
  }

  return (
    <>
      <div className="comments-bg">
        <div className="comments-container">
           <button className="close-comments" onClick={() => setCommentsVisible(false)}>
            <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
            </svg>
          </button>
          <ul className="comments-list">
            { filteredComments.length === 0 && <p>no comments</p>}
            { filteredComments.map(cm => {
              return (
                <li key={cm.id} className="comment">
                  <div className="creator-comment">
                    <img src={cm.img} alt="" />
                    <p>{cm.username}</p>
                  </div>
                  <p>{cm.comment_text}</p>
                </li>
              )
            })}
          </ul>
          <form className="new-comment" onSubmit={handleSubmit} encType="multipart/form-data">
            <textarea name="comment" className="text-comment" placeholder="comment here"></textarea>
            <button>Comment</button>
          </form>
        </div>
      </div>
    </>
  )
}