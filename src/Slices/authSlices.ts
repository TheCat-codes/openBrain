import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string,
  age: number,
  username: string,
  password: string,
  img: string,
  email: string,
  name: string,
  lastname: string
}

interface AuthState {
  user: User | null,
  error: string | null,
  loading: boolean
}

const initialState : AuthState = {
  user: null,
  loading: false,
  error: null
}

export const loginSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
      state.error = null
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    logout: (state) => {
      state.error = null
      state.loading = false
      state.user = null
    }
  }
})

export const { setError, setLoading, setUser, logout } = loginSlice.actions
export default loginSlice.reducer