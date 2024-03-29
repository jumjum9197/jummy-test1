import sessionDetailsReducer from '../reduxSlice/sessionSlice'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import { configureStore, combineReducers } from "@reduxjs/toolkit";



const persistConfig = {
  key: 'root',
  storage,
}


const rootReducer = combineReducers({ 
    sessionDetails: sessionDetailsReducer,
  
})

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const  store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]   
});

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
