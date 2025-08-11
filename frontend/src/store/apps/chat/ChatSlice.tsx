import { createSlice } from '@reduxjs/toolkit';

interface StateType {
  session: string; 
  chatSearch: string; 
}

const initialState = {
  session: '대화를 선택하세요',
  chatSearch: '',  
} as StateType;

export const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    searchChat: (state, action) => {
      state.chatSearch = action.payload;
    },
  },
});

export const {  setSession, searchChat } = ChatSlice.actions;
export default ChatSlice.reducer;