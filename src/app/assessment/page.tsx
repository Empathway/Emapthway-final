// src/app/assessment/page.tsx
'use client'; // This component uses useState and other client-side features

import React, { useState } from 'react';
import Link from 'next/link'; // Changed from 'react-router-dom'

// Define prop types for ScaleButton using TypeScript interfaces
interface ScaleButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isSelected: boolean;
  value: number;
}

// ScaleButton component with TypeScript props
const ScaleButton: React.FC<ScaleButtonProps> = ({ children, onClick, isSelected, value }) => (
  <button
    className={`scale-button w-full py-3 rounded-lg border ${
      isSelected ? 'border-primary bg-primary/20' : 'border-gray-600'
    } hover:bg-primary/10 transition`}
    onClick={onClick}
    data-value={value}
  >
    {children}
  </button>
);

const AssessmentPage: React.FC = () => { // Renamed to AssessmentPage to follow Next.js page convention
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Using a more specific type for answers, assuming values are numbers (0-4)
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const questions = [
    {
      question: "How often have you felt overwhelmed in the past week?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      question: "How would you rate your sleep quality recently?",
      options: ["Excellent", "Good", "Average", "Poor", "Terrible"]
    },
    {
      question: "How often do you experience feelings of anxiety?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Constantly"]
    },
    {
      question: "How connected do you feel to others?",
      options: ["Very Connected", "Somewhat Connected", "Neutral", "Somewhat Isolated", "Very Isolated"]
    }
  ];

  const handleAnswer = (value: number) => { // Explicitly type 'value' as number
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    const answeredCount = Object.keys(newAnswers).length;
    setProgress((answeredCount / questions.length) * 100);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () =>
    Object.values(answers).reduce((sum, val) => sum + (5 - val), 0);

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setProgress(0);
    setEmail('');
    setSent(false);
  };

  const handleSubmitEmail = () => {
    // TODO: integrate real email sending logic here
    setSent(true);
  };

  return (
    <div className="assessment-container py-12 px-8 bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Mental Health Assessment</h2>

      <div className="progress-bar bg-gray-700 rounded-full h-2 mb-8">
        <div
          className="progress-fill bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!showResults ? (
        <div className="question-container">
          <h3 className="question-text text-xl font-semibold mb-4 text-white">
            {questions[currentQuestion].question}
          </h3>
          <div className="options-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((opt, i) => (
              <ScaleButton
                key={i}
                value={i}
                onClick={() => handleAnswer(i)}
                isSelected={answers[currentQuestion] === i}
              >
                {opt}
              </ScaleButton>
            ))}
          </div>
        </div>
      ) : (
        <div className="results-container text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Your Wellness Score: {calculateScore()}/20
          </h3>
          <p className="mb-6 text-lg text-muted-foreground">
            {calculateScore() >= 16
              ? "You're showing great resilience! Consider exploring our mindfulness resources."
              : "Your responses suggest you might benefit from additional support. Remember, help is available."}
          </p>

          {!sent ? (
            <div className="email-form flex flex-col items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full max-w-sm px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                onClick={handleSubmitEmail}
                disabled={!email}
                className={`px-6 py-2 rounded-lg text-white ${
                  email
                    ? 'bg-primary hover:opacity-90 transition'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="sent-message flex items-center justify-center gap-2 mt-4 text-lg text-primary">
              <span>Results sent</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={resetAssessment}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentPage;