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
    // const navigate = useNavigate();

    const goToRecsPage = () => {} 

    const selectCategory = async () => {
        // const response = await fetch(/* news API */) // this sends data to the flask server
        // const json = await response.json(); // this parses the response to json
        // do stuff with the json response
        // navigate('/recs');

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "user_pref": category
        });

        fetch("/json_example", {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.error(error)
            });
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
                <button onClick={selectCategory}>Generate news</button>
            </div>
        </div>
    );
};

const getRandomCategories = () => {
    const allCategories: string[] = Object.values(NewsCategory);
    let randomCategories: string[] = [];

    while (randomCategories.length < 3) {
        const randomIndex = Math.floor(Math.random() * allCategories.length);
        const category: string = allCategories[randomIndex];

        if (!randomCategories.includes(category)) {
            randomCategories.push(category);
        }
    }

    return randomCategories;
};

const MainPage: React.FC = () => {
    const [categories, setCategories] = useState(getRandomCategories());
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setShowForm(true);
    };

    const handleRegenerate = () => {
        // Logic to fetch and set new categories
        setCategories(getRandomCategories());
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
