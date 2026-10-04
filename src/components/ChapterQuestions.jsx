import React, { useState } from 'react';
import { ChevronDown, Eye, EyeOff, CheckCircle2, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chapterQuestions } from '../questionsData';
import { playAudio } from './TextWithAudio';

export default function ChapterQuestions({ isExpanded, onToggle }) {
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const toggleAnswer = (id) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const badgeColor = "bg-gradient-to-br from-blue-400 to-blue-500 opacity-90";
  const headerLight = "bg-blue-50/80 border-blue-100";
  const headerDark = "dark:bg-blue-950/40 dark:border-blue-900";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800/90 rounded-2xl shadow-lg mt-12 mb-8 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 overflow-hidden backdrop-blur-sm"
    >
      {/* Card Header matching TopicCard style */}
      <div 
        className={`cursor-pointer p-4 md:p-5 border-b flex justify-between items-center transition-all duration-300 ${headerLight} ${headerDark} ${isExpanded ? '' : 'rounded-b-2xl border-b-0'}`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          {/* Topic Number Badge */}
          <div className={`${badgeColor} w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md flex-shrink-0`}>
            <ClipboardList size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base md:text-xl font-bold text-gray-800 dark:text-white leading-tight line-clamp-2">
              أسئلة نهاية الفصل
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5 truncate" dir="ltr">
              Chapter Questions
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`${badgeColor} p-1.5 md:p-2 rounded-full text-white shadow-sm`}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 md:p-6 bg-gray-50/50 dark:bg-gray-900/30 space-y-8" dir="ltr">
              
              <div className="text-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  These are the official questions from the end of Chapter 10. Click "Show Answer" to check your knowledge.
                </p>
              </div>

              {chapterQuestions.map((q, index) => (
                <div key={q.id} className="bg-white dark:bg-gray-800/80 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white leading-relaxed">
                      <span className="text-primary mr-2">Q{index + 1}.</span> 
                      {q.question}
                    </h3>
                    <button 
                      onClick={(e) => playAudio(q.question, e)}
                      className="text-primary dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-full transition-colors shrink-0"
                      title="Listen"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                    </button>
                  </div>
                  
                  {q.type === 'mcq' && (
                    <ul className="space-y-2.5 mb-5 ml-6">
                      {q.options.map((opt, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start gap-2.5 font-medium">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col items-start gap-4">
                    <button
                      onClick={() => toggleAnswer(q.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 dark:text-blue-300 rounded-lg font-medium transition-colors border border-blue-100 dark:border-blue-800/50"
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
                          className="w-full bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-4 rounded-xl"
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" size={20} />
                            <div>
                              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Answer:</span>
                              <span className="text-gray-800 dark:text-gray-200 whitespace-pre-line font-medium text-base">{q.answer}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-emerald-200/50 dark:border-emerald-800/50">
                            <span className="font-bold text-gray-700 dark:text-gray-300 text-sm block mb-1">Explanation:</span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">{q.explanation}</span>
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
