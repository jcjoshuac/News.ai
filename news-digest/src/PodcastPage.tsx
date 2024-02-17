// PodcastPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PodcastPage: React.FC = () => {
  const navigate = useNavigate();

  const goToConversationPage = () => {
    navigate('/conversation');
  };
  const goToMainPage = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Podcast</h1>
      <button onClick={goToConversationPage}>Follow up</button>
      <button onClick={goToMainPage}>Reselect category</button>
    </div>
  );
};

export default PodcastPage;
