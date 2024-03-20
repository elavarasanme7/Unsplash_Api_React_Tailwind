// api.js
// const UNSPLASH_API_KEY = '6D3aJ8QNkUxu-T4K8SQH1M5qq7oDIPk6zOOQuIYTdvA';
const UNSPLASH_API_KEY = 'iobp0fGf7AFN06x0Oe_CZLNdUhLXHeoZ5NcXYzIAUe8';

// Fetch random background image
export async function getRandomBackground() {
  const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`);
  const data = await response.json();
  console.log(data)
  return data.urls.regular;
}

// Search images based on query
export async function searchImages(query) {
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}`);
  const data = await response.json();
  console.log(data)
  return data.results.map(result => ({
    id: result.id,
    url: result.urls.regular,
    description: result.alt_description,
    starred: false,
  }));
}

// Toggle starred image
export async function toggleStarredImage(imageId, isStarred) {
  let starredImages = JSON.parse(localStorage.getItem('starredImages')) || [];
  if (isStarred) {
    starredImages.push(imageId);
  } else {
    starredImages = starredImages.filter(id => id !== imageId);
  }
  localStorage.setItem('starredImages', JSON.stringify(starredImages));
}

// Get starred images
export function getStarredImages() {
  const starredImageIds = JSON.parse(localStorage.getItem('starredImages')) || [];
  return starredImageIds.map(id => ({
    id,
    url: `https://api.unsplash.com/photos/${id}?client_id=${UNSPLASH_API_KEY}`,
    description: '',
    starred: true,
  }));
}
