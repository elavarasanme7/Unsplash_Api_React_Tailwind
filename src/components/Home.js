import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchImages, toggleStarredImage, getRandomBackground } from './api';
import { setImages, toggleBookmark } from './imagesSlice';
import { Link } from 'react-router-dom';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [randomBackgroundImage, setRandomBackgroundImage] = useState(null);

  const dispatch = useDispatch();
  const images = useSelector(state => state.images.images);

  useEffect(() => {
    fetchRandomImage();
    if (searchQuery) {
      fetchImages(searchQuery);
    }
  }, [searchQuery]);

  const fetchImages = async (query) => {
    try {
      const results = await searchImages(query);
      dispatch(setImages(results));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchRandomImage = async () => {
    try {
      const randomImage = await getRandomBackground();
      setRandomBackgroundImage(randomImage);
      console.log(randomImage)
    } catch (error) {
      console.error('Error fetching random image:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      fetchImages(searchQuery);
    }
  };

  const handleBookmarkToggle = async (imageId) => {
    try {
      const image = images.find(image => image.id === imageId);
      const newStatus = !image.bookmarked;
      dispatch(toggleBookmark({ imageId, newStatus }));
      toggleStarredImage(imageId, newStatus);
    } catch (error) {
      console.error('Error toggling bookmark status:', error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${randomBackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }} className="flex flex-col justify-center items-center">
      <div className="mt-10 mx-4">
        <form onSubmit={handleSearch} className="flex flex-col">
          <input
            type="text"
            placeholder="Search for images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </form>
        <Link to="/bookmarked-images" className="mt-4 ml-4 text-center text-sm font-medium text-indigo-600 hover:text-red-500">Go to Starred Images</Link>

      </div>
      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
        {images.map(image => (
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

export default Home;
