import { configureStore } from "@reduxjs/toolkit";
import usersReduser from "./Reduser";
import { persistReducer ,persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"

const config={
    key:"root",
    storage
}

const ReducerPersiste=persistReducer(config , usersReduser)



const store = configureStore({
    reducer: {
        User: ReducerPersiste
    },
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // لمنع تحذيرات serializable
    }),});

export const persistor=persistStore(store)
export default store;