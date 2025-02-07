import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// Definindo a interface AuthState corretamente
interface AuthState {
  email: string;
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
      action: PayloadAction<{ email: string }>,
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
