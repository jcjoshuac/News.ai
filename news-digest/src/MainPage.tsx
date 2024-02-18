// MainPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsCategory } from './NewsCategory.tsx';
import './App.css'; // Make sure to include your CSS styles here

interface CategoryButtonProps {
  category: string;
  onClick: (category: string) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onClick }) => {
  return (
    <button className="category-button" onClick={() => onClick(category)}>
      {category}
    </button>
  );
};

interface CategoryFormProps {
  category: string;
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category }) => {
    const navigate = useNavigate();
    
    const goToRecsPage = () => {
        navigate('/recs');
      };
    
  return (
    <div className="category-form">
      <div className="category-form-content">
        <h2>How familiar are you with this topic?</h2>
        <p>{category}</p>
        <select>
          <option value="1">Not familiar</option>
          <option value="2">Somewhat familiar</option>
          <option value="3">Very familiar</option>
        </select>
        <button onClick={goToRecsPage}>Generate news</button>
      </div>
    </div>
  );
};

const MainPage: React.FC = () => {
  const [categories, setCategories] = useState(['Tech', 'Fashion', 'Hollywood']);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleRegenerate = () => {
    // Logic to fetch and set new categories
    setCategories(['New Category 1', 'New Category 2', 'New Category 3']);
  };

  return (
    <div className="main-page">
      <h1>News.ai</h1>
      <p>Stay relevant with bite-sized, personalized podcasts</p>
      <p>Select your news category</p>
      <div className="category-container">
        {categories.map((category) => (
          <CategoryButton key={category} category={category} onClick={handleCategoryClick} />
        ))}
        <button className="regenerate-button" onClick={handleRegenerate}>
        &#x21bb;
        </button>
      </div>
      {showForm && <CategoryForm category={selectedCategory} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default MainPage;
