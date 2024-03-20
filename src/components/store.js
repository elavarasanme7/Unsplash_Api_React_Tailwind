import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './imagesSlice';

export default configureStore({
  reducer: {
    images: imagesReducer
  }
});
