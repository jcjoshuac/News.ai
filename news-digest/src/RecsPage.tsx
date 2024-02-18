// RecsPage.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const RecsPage: React.FC = () => {
//   const navigate = useNavigate();

//   const goToPodcastPage = () => {
//     navigate('/podcast');
//   };

//   const goToMainPage = () => {
//     navigate('/');
//   }

//   return (
//     <div>
//       <h1>Recommendations</h1>
//       <button onClick={goToPodcastPage}>Generate podcast</button>
//       <button onClick={goToMainPage}>Reselect category</button>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import NewsItem from './recommended_news.json'; // Assuming types.ts is in the same directory
import { useNavigate } from 'react-router-dom';

export interface NewsItem {
    title: String,
    content: String,
    link: String,
}

const Recommendations: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Fetch the news list from the local JSON file
    import('./recommended_news.json')
      .then((data: { default: NewsItem[] }) => {
        setNewsList(data.default);
        pickRandomNews(data.default);
      })
      .catch((error: Error) => console.error("Could not load news", error));
  }, []);

  const pickRandomNews = (newsArray: NewsItem[]) => {
    // Shuffle array and pick the first three items
    const shuffled = [...newsArray].sort(() => 0.5 - Math.random());
    setDisplayedNews(shuffled.slice(0, 3));
  };

  const handleRegenerate = () => {
    pickRandomNews(newsList);
  };

  const navigate = useNavigate();
  const handleReselectCategory = () => {
    navigate('/');
  };

  return (
    <div className="recommendations-container">
      <h2>Recommended news</h2>
      <p>Based on your interest</p>
      <div className="news-buttons">
        {displayedNews.map((news) => (
          <button>{news.title}</button>
        ))}
      </div>
      <button onClick={handleRegenerate}>Regenerate</button>
      <button onClick={handleReselectCategory}>Reselect category</button>
    </div>
  );
};

export default Recommendations;
