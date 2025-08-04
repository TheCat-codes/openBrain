import { configureStore } from "@reduxjs/toolkit"
import loginSlice from "../Slices/authSlices.ts"
import postSlice from "../Slices/postsSlices.ts"
import likesSlice from '../Slices/likesSlice.tsx'
import commentsSlice from '../Slices/commentsSlice.tsx'
import foreignPostsSlice from '../Slices/foreignSlice.ts'

export const store = configureStore({
  reducer: {
    loginSlice,
    postSlice,
    likesSlice,
    commentsSlice,
    foreignPostsSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch