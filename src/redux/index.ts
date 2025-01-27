import { configureStore } from "@reduxjs/toolkit";
import createProfileReducer from "./slices/createProfile";

const Store = configureStore({
    reducer: {
        createProfile: createProfileReducer,
    },
    });

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;