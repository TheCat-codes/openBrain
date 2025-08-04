import { addComment, setcomments, type Comment } from "../Slices/commentsSlice"
import { setForeignError, setForeignLoading, setForeignPosts } from "../Slices/foreignSlice"
import { addLike, removeLike, setLikes } from "../Slices/likesSlice"
import { setPosts, setLoading, setError, removePosts } from "../Slices/postsSlices"
import type { AppDispatch } from "../Store/store"
import { toast } from "sonner"

export const getPosts = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await fetch('https://backend-openbrain.onrender.com/api/getPosts', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    
    if (!res.ok) {
      return dispatch(setError(data.message))
    }

    dispatch(setPosts(data.posts))
  } catch (e) {
    if (e instanceof Error) {
      dispatch(setError(e.message))
    } else {
      dispatch(setError('error in the fetch'))
    }
  }
}

export const getPostsById = ({id}: {id:string}) => async (dispatch: AppDispatch) => {
  dispatch(setForeignLoading(true))
  try {
    const res = await fetch(`https://backend-openbrain.onrender.com/api/getPostsById/${id}`, {
      method: 'GET',
      credentials:'include'
    })

    const data = await res.json()

    if(!res.ok) {
      setForeignError('something went wrong')
    }

    dispatch(setForeignPosts(data.posts))
  } catch (e) {
    console.log(e)
  }
}

export const createPost = (postData: { text: string, img: File | null, id:string }) => async (dispatch: AppDispatch) => {
  
  const formdata = new FormData()
  formdata.append('text', postData.text)
  if (postData.img) {
    formdata.append('image', postData.img)
  }
  formdata.append('creator', postData.id)

  try {
    dispatch(setLoading(true))
    const res = await fetch('https://backend-openbrain.onrender.com/api/createPost', {
      method: 'POST',
      credentials: 'include',
      body: formdata
    })

    const data = await res.json()

    if(!res.ok) {
      return toast.error(data.error)
    }

    toast.success('published...')
  }catch (e) {
    if (e instanceof Error) {
      dispatch(setError(e.message))
    } else {
      dispatch(setError('error in the fetch'))
    }
  }
}

export const like = (postId: string, userId: string) => async (dispatch:AppDispatch) => {
  try {
    const res = await fetch(`https://backend-openbrain.onrender.com/api/likePost`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, userId })
    })

    const data = await res.json()

    if(!res.ok) {
      toast.error(data.message)
      return
    }

    dispatch(addLike({ post_id: postId, user_id: userId }))
    toast.success('liked...')
  } catch  (e) {
    console.log(e)
  }
}

export const dislike = (postId: string, userId: string) => async (dispatch:AppDispatch) => {
  try {
    const res = await fetch(`https://backend-openbrain.onrender.com/api/dislikePost`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, userId })
    })

    const data = await res.json()

    if(!res.ok) {
      toast.error(data.message)
    }

    dispatch(removeLike({ post_id: postId, user_id: userId }))
    toast.success('disliked...')
  } catch (e) {
    console.log(e)
  }
}

export const getLikes = () => async (dispatch: AppDispatch) => {
  try {
    const res = await fetch('https://backend-openbrain.onrender.com/api/getLikes', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()

    if (!res.ok) {
      return
    }

    dispatch(setLikes(data.likes))
  } catch (e) {
    if (e instanceof Error) {
      dispatch(setError(e.message))
    } else {
      dispatch(setError('error in the fetch'))
    }
  }
}

export const deletePostDatabase = (postToRemove:string) => async (dispatch:AppDispatch) => {
  try {
    const res = await fetch(`https://backend-openbrain.onrender.com/api/deletePost/${postToRemove}`, {
      method: 'DELETE',
      credentials:'include'
    })

    const data = await res.json()

    if(!res.ok) {
      toast.error(data.message)
      return
    }

    dispatch(removePosts(postToRemove))
    toast.success(data.message)
  } catch (e) {
    console.log(e)
  }
}

export const comment = ({postId, userId, commentText}:{postId:string, userId:string, commentText:string}) => async (dispatch:AppDispatch) => {
  try {
    toast.success('Publishing comment')
    const res = await fetch(`https://backend-openbrain.onrender.com/api/commentPost`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, userId, commentText })
    })

    const data = await res.json()

    if(!res.ok) {
      return toast.error(data.message)
    }

    const newComment:Comment = {
      post_id: postId,
      comment_text: commentText,
      id: data.comment.id,
      img: data.comment.img,
      username: data.comment.username
    }

    dispatch(addComment(newComment))
    toast.success('comment added...')
  } catch (e) {
    console.log(e)
  }
}

export const getComments  = () => async (dispatch:AppDispatch) => {
  try {
    const res = await fetch('https://backend-openbrain.onrender.com/api/getComments', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()

    if (!res.ok) {
      return toast.error(data.error)
    }

    dispatch(setcomments(data.comments))
  } catch (e) {
    console.log(e)
  }
}