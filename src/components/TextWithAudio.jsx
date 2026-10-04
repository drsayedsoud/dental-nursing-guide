import React from 'react';
import { Volume2 } from 'lucide-react';

export const playAudio = (text, e) => {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech to prevent overlapping
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85; // Slightly slower for clearer pronunciation for students
    window.speechSynthesis.speak(utterance);
  }
};

export default function TextWithAudio({ text }) {
  if (!text) return null;
  
  // Regex to match English words or phrases (allows letters, spaces, hyphens, and numbers)
  // Ensures it starts and ends with a letter, or is a single letter
  const regex = /([a-zA-Z][a-zA-Z0-9\s\-]*[a-zA-Z]|[a-zA-Z])/g;
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, index) => {
        // If the part matches our English regex
        if (/^[a-zA-Z][a-zA-Z0-9\s\-]*[a-zA-Z]$|^[a-zA-Z]$/.test(part)) {
          return (
            <span 
              key={index} 
              className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 bg-blue-50/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-md border border-blue-100 dark:border-blue-800 shadow-sm whitespace-nowrap" 
              dir="ltr"
            >
              <span className="font-semibold font-sans">{part}</span>
              <button 
                onClick={(e) => playAudio(part, e)}
                className="text-primary dark:text-blue-300 hover:text-blue-900 dark:hover:text-white transition-colors p-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-700 active:scale-95 focus:outline-none"
                title="استمع للنطق الصحيح"
              >
                <Volume2 size={14} />
              </button>
            </span>
          );
        }
        // Return standard Arabic text or punctuation
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
