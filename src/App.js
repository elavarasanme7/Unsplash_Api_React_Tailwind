"use strict";

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store'; 

const Home = React.lazy(() => import('./components/Home'));
const BookmarkedImagesPage = React.lazy(() => import('./components/BookmarkedImages'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarked-images" element={<BookmarkedImagesPage />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
