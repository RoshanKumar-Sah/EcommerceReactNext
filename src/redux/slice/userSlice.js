import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isLoading: true,
    value: null
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        "setReduxUser": (state, action) => {
            // console.log(action);
            state.value = action.payload
            state.isLoading = false
        },
        "logout": (state)=>{
            state.value = null
            localStorage.removeItem("access_token")
            localStorage.removeItem("cart_items")
        },
        "stopLoading":(state)=>{
            state.isLoading = false
        }

    }
})

// Action creators are generated for each case reducer function
export const { setReduxUser, logout, stopLoading } = userSlice.actions

export default userSlice.reducer