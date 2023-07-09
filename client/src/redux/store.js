import { configureStore } from '@reduxjs/toolkit'
import userDataSlice from './features/userDataSlice'

const store = configureStore({
    reducer: {
        userData: userDataSlice,
    }

})

export default store