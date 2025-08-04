import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface Posts {
    id: string,
    text: string,
    img: string,
    username: string,
    creator: string,
    created_at: string,
    user_img: string,
    post_likes:number,
    post_comments:number
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

const foreignPostsSlice = createSlice({
  name:'visitedUser',
  initialState,
  reducers: {
    setForeignError:(state, action:PayloadAction<string>) => {
      state.error=action.payload
      state.loading=false
    },
    setForeignLoading: (state, action:PayloadAction<boolean>) => {
      state.loading = action.payload
      state.error = null
    },
    setForeignPosts:(state, action:PayloadAction<Posts[]>) => {
      state.posts=action.payload
      state.loading=false
      state.error=null
    }
  }
})

export const { setForeignError, setForeignLoading, setForeignPosts } = foreignPostsSlice.actions
export default foreignPostsSlice.reducer