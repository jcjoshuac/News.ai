import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import RecsPage from './RecsPage';
import PodcastPage from './PodcastPage';
import ConversationPage from './ConversationPage';
import './App.css';

const App: React.FC = () => {
  // // Example state variable and setter
  // const [test, setTest] = useState<string>("Hello world");

  // // Example function to handle state change
  // const changeTest = () => {
  //   setTest("Hello Vite + React!");
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recs" element={<RecsPage />} />
        <Route path="/podcast" element={<PodcastPage />} />
        <Route path="/conversation" element={<ConversationPage />} />
      </Routes>
    </Router>
  );
};

export default App;

