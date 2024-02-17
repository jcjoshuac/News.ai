// MainPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const goToRecsPage = () => {
    navigate('/recs');
  };

  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={goToRecsPage}>Go to Recs Page</button>
    </div>
  );
};

export default MainPage;
