/*
 * File: src/components/StyleQuiz.tsx
 * Purpose: Interactive style personality quiz with animated transitions and result screen.
 * Notes:
 * - Uses React 18.3 state for question progression and results.
 * - Data sources: src/data/quiz.ts (questions, styleResults) and types from src/types.ts.
 * - UI styled with Tailwind CSS 3.4 utility classes.
 */
import { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCw, ArrowLeft, Home } from 'lucide-react';
import { questions, styleResults } from '../data/quiz';
import { StyleResult } from '../types';

interface StyleQuizProps {
  onBackToHome: () => void;
  onComplete?: (result: StyleResult) => void;
}

export default function StyleQuiz({ onBackToHome, onComplete }: StyleQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const calculateResult = (): StyleResult => {
    const counts = [0, 0, 0, 0, 0, 0]; // casual, classic, creative, modern, vintage, trendy
    
    answers.forEach(answer => {
      counts[answer]++;
    });
    
    const maxIndex = counts.indexOf(Math.max(...counts));
    return styleResults[maxIndex];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setIsTransitioning(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const result = calculateResult();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl w-full animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Style Personality</h1>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {result.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Result Image */}
            <div className="relative">
              <img
                src={result.image}
                alt={result.title}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            </div>

            {/* Result Details */}
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {result.description}
              </p>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                  Your Style Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white rounded-full text-sm font-medium text-purple-700 shadow-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Perfect Outfit Categories</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {result.outfitTypes.map((type, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                
                <h4 className="font-medium text-gray-700 mb-2">Your Color Palette</h4>
                <div className="flex flex-wrap gap-2">
                  {result.colors.map((color, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white text-gray-700 rounded text-sm border"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">Style Recommendations</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Take Quiz Again
            </button>
            
            <button
              onClick={onBackToHome}
              className="flex-1 bg-white border-2 border-purple-500 text-purple-600 font-semibold py-4 px-6 rounded-xl hover:bg-purple-50 transition-all duration-200 flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Browse Outfits
            </button>
            {onComplete && (
              <button
                onClick={() => onComplete(result)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Shop Your Style
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          
          {currentQuestion > 0 && (
            <button
              onClick={goBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
          )}
        </div>

        {/* Quiz Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Style Discovery Quiz</h1>
          <p className="text-gray-600">Discover your personal style personality</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          {/* Options with Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="group relative bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-200 overflow-hidden hover:shadow-lg transform hover:scale-105"
              >
                {questions[currentQuestion].images && (
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={questions[currentQuestion].images![index]}
                      alt={option}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}
                
                <div className="p-4">
                  <span className="text-gray-700 group-hover:text-gray-900 font-medium text-sm leading-relaxed">
                    {option}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-200 mt-2 mx-auto" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}