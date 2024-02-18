// RecsPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecsPage: React.FC = () => {
  const navigate = useNavigate();

  const goToPodcastPage = () => {
    navigate('/podcast');
  };

  const goToMainPage = () => {
    navigate('/');
  }

  return (
    <div>
      <h1>Recommendations</h1>
      <button onClick={goToPodcastPage}>Generate podcast</button>
      <button onClick={goToMainPage}>Reselect category</button>
    </div>
  );
};

export default RecsPage;
