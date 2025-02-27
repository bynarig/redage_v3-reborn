// features/news/newsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewsState {
  newsItems: any[]; // Replace 'any' with the actual type of news items
}

const initialState: NewsState = {
  newsItems: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<any[]>) => { // Replace 'any[]' with the actual type of news items array
      state.newsItems = action.payload;
    },
    addNewsItem: (state, action: PayloadAction<any>) => { // Replace 'any' with the actual type of a news item
      state.newsItems.push(action.payload);
    },
    clearNews: (state) => {
      state.newsItems = [];
    }
  },
});

export const { setNews, addNewsItem, clearNews } = newsSlice.actions;
export default newsSlice.reducer;