// ConversationPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConversationPage: React.FC = () => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate('/');
  };
  const goToRecsPage = () => {
    navigate('/recs');
  };

  return (
    <div>
      <h1>Conversation</h1>
      <button onClick={goToMainPage}>Reselect category</button>
      <button onClick={goToRecsPage}>Reselect news</button>
    </div>
  );
};

export default ConversationPage;
