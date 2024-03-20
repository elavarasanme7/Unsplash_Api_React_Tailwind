import { createSlice } from '@reduxjs/toolkit';

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    bookmarkedImages: []
  },
  reducers: {
    setImages(state, action) {
      state.images = action.payload;
    },
    toggleBookmark(state, action) {
      const { imageId, newStatus } = action.payload;
      state.images = state.images.map(image =>
        image.id === imageId ? { ...image, bookmarked: newStatus } : image
      );
      state.bookmarkedImages = state.images.filter(image => image.bookmarked);
    }
  }
});

export const { setImages, toggleBookmark } = imagesSlice.actions;

export default imagesSlice.reducer;
