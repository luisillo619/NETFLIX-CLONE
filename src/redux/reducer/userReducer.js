import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name: 'user',
    initialState: {
      name: "",
      status: 'idle',
      error: null
    },
    reducers: {
      setName: (state, action) => {
        state.name = action.payload
      },
    },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    
  }
})

// Action creators are generated for each case reducer function
export const { setName } = userSlice.actions

export default userSlice.reducer