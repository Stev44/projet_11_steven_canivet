import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
    clearToken(state) {
      state.token = ''
    },
  },
})

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    firstName: '',
    lastName: '',
    userName: '',
    id: '',
  },
  reducers: {
    setData(state, action) {
      return { ...state, ...action.payload }
    },
    clearUserName(state) {
      state.userName = ''
    },
  },
})

export const rememberSlice = createSlice({
  name: 'remember',
  initialState: {
    rememberMe: false,
    email: '',
  },
  reducers: {
    setRemember(state, action) {
      state.rememberMe = action.payload.rememberMe
      state.email = action.payload.email
    },
    clearRemember(state) {
      state.rememberMe = false
      state.email = ''
    },
  },
})

export const connectedSlice = createSlice({
  name: 'connexion',
  initialState: {
    isConnected: false,
  },
  reducers: {
    setIsConnected(state, action) {
      state.isConnected = action.payload.isConnected
    },
  },
})

export const savedSlice = createSlice({
  name: 'save',
  initialState: {
    isSaved: false,
  },
  reducers: {
    setIsSaved(state, action) {
      state.isSaved = action.payload.isSaved
    },
    clearSaved(state) {
      state.isSaved = false
    },
  },
})

export const { setToken, clearToken } = authSlice.actions
export const { setRemember, clearRemember } = rememberSlice.actions
export const { setIsConnected } = connectedSlice.actions
export const { setData, clearUserName } = dataSlice.actions
export const { setIsSaved, clearSaved } = savedSlice.actions
