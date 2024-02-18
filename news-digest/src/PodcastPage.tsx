// PodcastPage.tsx
import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
    title: string;
}

const PodcastPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const [question, setQuestion] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const navigate = useNavigate();

  // Function to handle the submission of a question
  const handleQuestionSubmit = () => {
    // Put question in openAI API
    // Go to conversation page
    navigate('/conversation');
    console.log(question);
    // Clear the question input
    setQuestion('');
  };

  return (
    <div className="podcast-player">
      <h1>Selected News Podcast</h1>
      <p>{state?.title}</p>
      <audio ref={audioRef} src="path_to_your_audio_file.mp3" preload="none" />
      <button onClick={togglePlayPause} className="play-pause-button">
        {isPlaying ? '⏸' : '▶'}
      </button>

      <div>
        <label htmlFor="follow-up-question">Ask a follow-up question</label>
        <input
          type="text"
          id="follow-up-question"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Type question here"
        />
        <button onClick={handleQuestionSubmit}>Submit Question</button>
      </div>
    </div>
  );
};

export default PodcastPage;
