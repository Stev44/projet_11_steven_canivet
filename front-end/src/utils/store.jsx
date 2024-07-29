import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  authSlice,
  dataSlice,
  rememberSlice,
  connectedSlice,
  savedSlice,
} from './slice'

const reducer = combineReducers({
  auth: authSlice.reducer,
  data: dataSlice.reducer,
  remember: rememberSlice.reducer,
  connexion: connectedSlice.reducer,
  save: savedSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
