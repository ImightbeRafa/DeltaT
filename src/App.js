import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Blog from './components/blog';
import BlogPost from './components/BlogPost';
import Portfolio from './components/portfolio';
import Games from './components/games';
import Contact from './components/contact';
import SnakeGame from './components/SnakeGame';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/snake" component={SnakeGame} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;