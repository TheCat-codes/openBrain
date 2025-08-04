import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface Posts {
    id: string,
    text: string,
    img: string,
    username: string,
    creator: string,
    created_at: string,
    user_image: string,
    post_comments: number,
    post_likes:number
}

interface PostsState {
    posts: Posts[] | [],
    error: string | null,
    loading: boolean
}

export const initialState: PostsState = {
    posts: [],
    loading: false,
    error: null
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, action:PayloadAction<boolean>) => {
      state.loading = action.payload
      state.error = null
    },
    setPosts: (state, action) => {
      state.posts = action.payload
      state.loading = false
      state.error = null
    },
    addPost: (state, action:PayloadAction<Posts>) => {
      state.posts = [{...action.payload}, ...state.posts]
      state.loading = false
      state.error = null
    },
    removePosts: (state, action:PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload)
      state.loading = false
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const { setLoading, setPosts, setError, removePosts, addPost } = postSlice.actions
export default postSlice.reducer