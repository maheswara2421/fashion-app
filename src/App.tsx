/*
 * File: src/App.tsx
 * Purpose: Root React component for the web app. Switches between the product HomePage and the StyleQuiz.
 * Notes:
 * - Built with React 18.3 and TypeScript 5.5, rendered from src/main.tsx via Vite 7.
 * - Image viewer and filtering logic live in child components.
 * - No external routing library on web; simple view switch with local state.
 */
import { useState } from 'react';
import HomePage from './components/HomePage';
import StyleQuiz from './components/StyleQuiz';
import type { StyleResult } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'quiz'>('home');
  const [quizResult, setQuizResult] = useState<StyleResult | null>(null);

  return (
    <>
      {currentView === 'home' && (
        <HomePage
          onStartQuiz={() => setCurrentView('quiz')}
          quizResult={quizResult || undefined}
        />
      )}
      {currentView === 'quiz' && (
        <StyleQuiz
          onBackToHome={() => setCurrentView('home')}
          onComplete={(res) => {
            setQuizResult(res);
            setCurrentView('home');
          }}
        />
      )}
    </>
  );
}

export default App;