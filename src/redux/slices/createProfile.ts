import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CreateProfileData } from '@/types'

interface AuthState extends Omit<CreateProfileData, 'name' | 'phone' | 'password'> {
  message: string | null;
}

const initialState: AuthState = {
  email: '',
  message: null
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData(
      state,
      action: PayloadAction<
        Omit<CreateProfileData, 'name' | 'phone' | 'password'>
      >,
    ) {
      state.email = action.payload.email
    },
    setMessage(state, action: PayloadAction<string | null>) {
      state.message = action.payload
    },
    clearState(state) {
      state.email = ''
      state.message = null
    }
  },
})

export const { setProfileData, setMessage, clearState } = profileSlice.actions
export default profileSlice.reducer
