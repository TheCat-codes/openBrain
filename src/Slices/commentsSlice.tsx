import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface Comment {
  username: string,
  post_id: string,
  comment_text: string,
  id:number,
  img:string
}

export interface CommentsState {
  comments: Comment[]
}

export const initialState: CommentsState = {
  comments: []
}

export const commentsSlice = createSlice({
  name:'comments',
  initialState,
  reducers: {
    setcomments: (state, action:PayloadAction<Comment[]>) => {
      state.comments = action.payload
    },
    addComment: (state, action:PayloadAction<Comment>) => {
      state.comments.push(action.payload)
    }
  }
})

export const { setcomments, addComment } = commentsSlice.actions
export default commentsSlice.reducer