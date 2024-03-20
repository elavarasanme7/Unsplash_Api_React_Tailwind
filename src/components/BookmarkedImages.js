import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleStarredImage,getRandomBackground  } from './api';
import { toggleBookmark } from './imagesSlice';
import { Link } from 'react-router-dom';

function BookmarkedImagesPage() {
  const dispatch = useDispatch();
  const bookmarkedImages = useSelector(state => state.images.bookmarkedImages);
  const [randomBackgroundImage, setRandomBackgroundImage] = useState(null); 

  useEffect(() => {
    fetchRandomBackground(); 
  }, []);

  const fetchRandomBackground = async () => {
    try {
      const randomImage = await getRandomBackground(); 
      setRandomBackgroundImage(randomImage); 
    } catch (error) {
      console.error('Error fetching random background image:', error);
    }
  };

  const handleBookmarkToggle = async (imageId) => {
    try {
      const image = bookmarkedImages.find(image => image.id === imageId);
      const newStatus = !image.bookmarked;
      dispatch(toggleBookmark({ imageId, newStatus }));
      await toggleStarredImage(imageId, newStatus);
    } catch (error) {
      console.error('Error toggling bookmark status:', error)
    }
  };

  return (
    <div style={{ backgroundImage: `url(${randomBackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }} className="px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-red-500 mt-2">Starred Images</h2>
      <Link to="/" className="mt-4 block text-sm font-medium text-center text-indigo-600 hover:text-indigo-500">Go to Home</Link>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {bookmarkedImages.map(image => (
          <div key={image.id} className="relative flex justify-center items-center">
            <img src={image.url} alt={image.description} className="w-full h-48 object-cover rounded-lg shadow-lg" />
            <span
              className="absolute top-2 right-2 text-xl text-gray-600 cursor-pointer hover:text-gray-500"
              onClick={() => handleBookmarkToggle(image.id)}
            >
              {image.bookmarked ? '★' : '☆'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookmarkedImagesPage;
