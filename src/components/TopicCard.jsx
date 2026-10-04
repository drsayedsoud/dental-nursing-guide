import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopicCard({ topic }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (index) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
  };

  const isCorrect = selectedOption === topic.question.correctAnswer;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <div 
        className="cursor-pointer p-6 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-blue-900/30 dark:to-blue-800/20 flex justify-between items-center transition-colors duration-300"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{topic.title}</h2>
          <p className="text-primary dark:text-blue-300 font-medium mt-1" dir="ltr">{topic.subtitle}</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-sm text-primary dark:text-blue-300 transition-colors">
          {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 border-b-2 border-accent inline-block pb-1">الشرح ببساطة</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg whitespace-pre-line bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600 shadow-sm transition-colors duration-300">
                    {topic.content}
                  </p>
                </div>
                <div className="md:w-1/3">
                  <div className="rounded-xl overflow-hidden shadow-md h-full min-h-[200px] relative">
                    <img 
                      src={topic.imageUrl} 
                      alt={topic.subtitle}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 transition-colors duration-300">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">؟</span>
                  اختبر فهمك
                </h3>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">{topic.question.text}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {topic.question.options.map((option, index) => {
                    let btnClass = "p-4 rounded-xl border-2 text-right font-medium transition-all duration-300 ";
                    
                    if (!showResult) {
                      btnClass += "border-gray-200 dark:border-gray-600 hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/20 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200";
                    } else {
                      if (index === topic.question.correctAnswer) {
                        btnClass += "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300";
                      } else if (index === selectedOption) {
                        btnClass += "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300";
                      } else {
                        btnClass += "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        disabled={showResult}
                        className={btnClass}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && index === topic.question.correctAnswer && <CheckCircle2 className="text-green-500 dark:text-green-400" size={20} />}
                          {showResult && index === selectedOption && index !== topic.question.correctAnswer && <XCircle className="text-red-500 dark:text-red-400" size={20} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-6 p-4 rounded-xl border transition-colors duration-300 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'}`}
                    >
                      <h4 className={`font-bold mb-1 flex items-center gap-2 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'}`}>
                        {isCorrect ? '✨ إجابة صحيحة يا بطل!' : '💡 محاولة جيدة، لكن ركز شوية!'}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                        <span className="font-bold">التفسير: </span>
                        {topic.question.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {showResult && (
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => {
                        setShowResult(false);
                        setSelectedOption(null);
                      }}
                      className="text-primary dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm underline transition-colors"
                    >
                      إعادة السؤال
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
