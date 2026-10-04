import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ChevronDown, RotateCcw, BookOpen, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextWithAudio from './TextWithAudio';


const BADGE_COLORS = [
  'bg-gradient-to-br from-blue-400 to-blue-500 opacity-90',
  'bg-gradient-to-br from-rose-400 to-rose-500 opacity-90',
  'bg-gradient-to-br from-amber-400 to-amber-500 opacity-90',
  'bg-gradient-to-br from-emerald-400 to-emerald-500 opacity-90',
  'bg-gradient-to-br from-purple-400 to-purple-500 opacity-90',
  'bg-gradient-to-br from-orange-400 to-orange-500 opacity-90',
  'bg-gradient-to-br from-pink-400 to-pink-500 opacity-90',
  'bg-gradient-to-br from-teal-400 to-teal-500 opacity-90',
  'bg-gradient-to-br from-indigo-400 to-indigo-500 opacity-90',
  'bg-gradient-to-br from-cyan-400 to-cyan-500 opacity-90',
  'bg-gradient-to-br from-lime-500 to-lime-600 opacity-90',
];

const HEADER_LIGHT = [
  'bg-blue-50/80 border-blue-100',
  'bg-rose-50/80 border-rose-100',
  'bg-amber-50/80 border-amber-100',
  'bg-emerald-50/80 border-emerald-100',
  'bg-purple-50/80 border-purple-100',
  'bg-orange-50/80 border-orange-100',
  'bg-pink-50/80 border-pink-100',
  'bg-teal-50/80 border-teal-100',
  'bg-indigo-50/80 border-indigo-100',
  'bg-cyan-50/80 border-cyan-100',
  'bg-lime-50/80 border-lime-100',
];

const HEADER_DARK = [
  'dark:bg-blue-950/40 dark:border-blue-900',
  'dark:bg-rose-950/40 dark:border-rose-900',
  'dark:bg-amber-950/40 dark:border-amber-900',
  'dark:bg-emerald-950/40 dark:border-emerald-900',
  'dark:bg-purple-950/40 dark:border-purple-900',
  'dark:bg-orange-950/40 dark:border-orange-900',
  'dark:bg-pink-950/40 dark:border-pink-900',
  'dark:bg-teal-950/40 dark:border-teal-900',
  'dark:bg-indigo-950/40 dark:border-indigo-900',
  'dark:bg-cyan-950/40 dark:border-cyan-900',
  'dark:bg-lime-950/40 dark:border-lime-900',
];

export default function TopicCard({ topic, index, isExpanded, onToggle, onQuizComplete, quizResult }) {
  const [selectedOption, setSelectedOption] = useState(quizResult?.selected ?? null);
  const [showResult, setShowResult] = useState(quizResult != null);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const colorIndex = index % BADGE_COLORS.length;
  const badgeColor = BADGE_COLORS[colorIndex];
  const headerLight = HEADER_LIGHT[colorIndex];
  const headerDark = HEADER_DARK[colorIndex];

  // Sync with external quiz state (e.g. "Reset All" from stats modal)
  useEffect(() => {
    if (quizResult != null) {
      setSelectedOption(quizResult.selected);
      setShowResult(true);
    } else {
      setSelectedOption(null);
      setShowResult(false);
    }
  }, [quizResult]);

  const handleOptionClick = (optionIndex) => {
    if (showResult) return;
    setSelectedOption(optionIndex);
    setShowResult(true);
    const isCorrect = optionIndex === topic.question.correctAnswer;
    onQuizComplete?.(topic.id, isCorrect, optionIndex);
  };

  const handleRetry = () => {
    setShowResult(false);
    setSelectedOption(null);
    onQuizComplete?.(topic.id, null, null);
  };

  const isCorrect = selectedOption === topic.question.correctAnswer;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 overflow-hidden backdrop-blur-sm"
    >
      {/* Card Header */}
      <div 
        className={`cursor-pointer p-4 md:p-5 border-b flex justify-between items-center transition-all duration-300 ${headerLight} ${headerDark} ${isExpanded ? '' : 'rounded-b-2xl border-b-0'}`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          {/* Topic Number Badge */}
          <div className={`${badgeColor} w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md flex-shrink-0`}>
            {topic.id}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base md:text-xl font-bold text-gray-800 dark:text-white leading-tight line-clamp-2">
              {topic.title.replace(/^\d+\.\s*/, '')}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5 truncate" dir="ltr">
              <TextWithAudio text={topic.subtitle} />
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Quiz status indicator */}
          {quizResult != null && (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${quizResult.isCorrect ? 'bg-green-100 dark:bg-green-900/40' : 'bg-red-100 dark:bg-red-900/40'}`}>
              {quizResult.isCorrect ? (
                <CheckCircle2 size={14} className="text-green-600 dark:text-green-400" />
              ) : (
                <XCircle size={14} className="text-red-500 dark:text-red-400" />
              )}
            </div>
          )}
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`${badgeColor} p-1.5 md:p-2 rounded-full text-white shadow-sm`}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 md:p-6 space-y-6">
              {/* Content Section */}
              <div className="flex flex-col md:flex-row gap-5">
                <div className="md:w-2/3">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={18} className="text-gray-400" />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">الشرح ببساطة</h3>
                  </div>
                  <div className="text-gray-700 dark:text-gray-200 leading-relaxed text-[15px] md:text-base whitespace-pre-line bg-gray-50 dark:bg-gray-700/30 p-4 md:p-5 rounded-xl border border-gray-100 dark:border-gray-600/50 transition-colors duration-300">
                    <TextWithAudio text={topic.content} />
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="rounded-xl overflow-hidden shadow-md h-48 md:h-full md:min-h-[220px] relative group">
                    <img 
                      src={topic.imageUrl} 
                      alt=<TextWithAudio text={topic.subtitle} />
                      onClick={() => setIsImageOpen(true)}
                      className="absolute inset-0 w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                      <span className="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                        اضغط للتكبير
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quiz Section */}
              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/60 dark:from-blue-950/30 dark:to-indigo-950/20 p-4 md:p-6 rounded-xl border border-blue-100/80 dark:border-blue-800/50 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${badgeColor} w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm`}>
                    <Sparkles size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">اختبر فهمك</h3>
                </div>
                
                <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-100 mb-4 pr-1">
                  <TextWithAudio text={topic.question.text} />
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {topic.question.options.map((option, optionIndex) => {
                    let btnClass = "p-3 md:p-4 rounded-xl border-2 text-right font-medium transition-all duration-300 text-sm md:text-base ";
                    
                    if (!showResult) {
                      btnClass += "border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-gray-700 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:shadow-md cursor-pointer active:scale-[0.98]";
                    } else {
                      if (optionIndex === topic.question.correctAnswer) {
                        btnClass += "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 shadow-sm";
                      } else if (optionIndex === selectedOption) {
                        btnClass += "border-red-400 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300";
                      } else {
                        btnClass += "border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 text-gray-400 dark:text-gray-500 opacity-50";
                      }
                    }

                    return (
                      <motion.button
                        key={optionIndex}
                        whileHover={!showResult ? { scale: 1.02 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                        onClick={() => handleOptionClick(optionIndex)}
                        disabled={showResult}
                        className={btnClass}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex-1">{option}</span>
                          {showResult && optionIndex === topic.question.correctAnswer && (
                            <CheckCircle2 className="text-green-500 dark:text-green-400 flex-shrink-0" size={20} />
                          )}
                          {showResult && optionIndex === selectedOption && optionIndex !== topic.question.correctAnswer && (
                            <XCircle className="text-red-500 dark:text-red-400 flex-shrink-0" size={20} />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Result */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`mt-5 p-4 rounded-xl border transition-colors duration-300 ${
                        isCorrect 
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                          : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                      }`}
                    >
                      <div className="flex-1">
                        <h4 className={`font-bold mb-1.5 flex items-center gap-2 text-base ${
                          isCorrect ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'
                        }`}>
                          {isCorrect ? (
                            <>
                              <Award size={18} />
                              إجابة صحيحة يا بطل! ✨
                            </>
                          ) : (
                            '💡 محاولة جيدة، لكن ركز شوية!'
                          )}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm md:text-base">
                          <span className="font-bold">التفسير: </span>
                          <TextWithAudio text={topic.question.explanation} />
                        </p>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button 
                          onClick={handleRetry}
                          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors bg-white/60 dark:bg-gray-800/60 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary/30"
                        >
                          <RotateCcw size={14} />
                          إعادة السؤال
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    
      {/* Image Modal */}
      <AnimatePresence>
        {isImageOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 cursor-pointer backdrop-blur-sm"
          >
            <motion.img 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              src={topic.imageUrl} 
              alt=<TextWithAudio text={topic.subtitle} />
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
