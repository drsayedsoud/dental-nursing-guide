import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chapterQuestions } from '../questionsData';

export default function ChapterQuestions({ isExpanded, onToggle }) {
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const toggleAnswer = (id) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-12 mb-8 border-2 border-primary/20 hover:shadow-xl transition-all duration-300 relative"
    >
      <div 
        className={`cursor-pointer p-6 bg-gradient-to-r from-blue-600 to-primary text-white flex justify-between items-center transition-colors duration-300 sticky top-0 z-30 shadow-md ${isExpanded ? 'rounded-t-2xl' : 'rounded-2xl'}`}
        onClick={onToggle}
      >
        <div>
          <h2 className="text-2xl font-bold">أسئلة نهاية الفصل</h2>
          <p className="text-blue-100 font-medium mt-1" dir="ltr">Chapter Questions</p>
        </div>
        <div className="bg-white/20 p-2 rounded-full shadow-sm text-white transition-colors">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden rounded-b-2xl"
          >
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 space-y-8" dir="ltr">
              
              <div className="text-center mb-6 border-b pb-4 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300">
                  These are the official questions from the end of Chapter 10. Click "Show Answer" to check your knowledge.
                </p>
              </div>

              {chapterQuestions.map((q, index) => (
                <div key={q.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                    <span className="text-primary mr-2">Q{index + 1}.</span> 
                    {q.question}
                  </h3>
                  
                  {q.type === 'mcq' && (
                    <ul className="space-y-2 mb-4 ml-6">
                      {q.options.map((opt, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="mt-1 w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col items-start gap-4">
                    <button
                      onClick={() => toggleAnswer(q.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/40 dark:hover:bg-blue-800/60 dark:text-blue-200 rounded-lg font-medium transition-colors"
                    >
                      {revealedAnswers[q.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                      <span dir="rtl">{revealedAnswers[q.id] ? "إخفاء الإجابة" : "إظهار الإجابة"}</span>
                    </button>

                    <AnimatePresence>
                      {revealedAnswers[q.id] && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg"
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <CheckCircle2 className="text-green-600 dark:text-green-400 mt-1 shrink-0" size={20} />
                            <div>
                              <span className="font-bold text-green-800 dark:text-green-300 block mb-1">Answer:</span>
                              <span className="text-gray-800 dark:text-gray-200 whitespace-pre-line font-medium">{q.answer}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-green-200/50 dark:border-green-800/50">
                            <span className="font-bold text-gray-700 dark:text-gray-300 text-sm block mb-1">Explanation:</span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{q.explanation}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
