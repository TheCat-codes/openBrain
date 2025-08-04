import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface likesStyle {
  post_id: string,
  user_id: string
}

interface Likes {
  likes: likesStyle[]
}

export const initialState: Likes = {
  likes: []
}

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (state, action:PayloadAction<likesStyle[]>) => {
      state.likes = action.payload
    },
     addLike: (state, action: PayloadAction<likesStyle>) => {
      const exists = state.likes.some(like =>
        like.post_id === action.payload.post_id &&
        like.user_id === action.payload.user_id
      )
      if (!exists) {
        state.likes.push(action.payload)
      }
    },
    removeLike: (state, action: PayloadAction<likesStyle>) => {
      state.likes = state.likes.filter(like =>
        !(like.post_id === action.payload.post_id &&
          like.user_id === action.payload.user_id)
      )
    }
  }
})

export const { setLikes, addLike, removeLike } = likesSlice.actions
export default likesSlice.reducer