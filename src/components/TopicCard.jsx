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
      className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div 
        className="cursor-pointer p-6 bg-gradient-to-r from-primary/10 to-primary/5 flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{topic.title}</h2>
          <p className="text-primary font-medium mt-1" dir="ltr">{topic.subtitle}</p>
        </div>
        <div className="bg-white p-2 rounded-full shadow-sm text-primary">
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
                  <h3 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-accent inline-block pb-1">الشرح ببساطة</h3>
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
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

              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">؟</span>
                  اختبر فهمك
                </h3>
                <p className="text-lg font-medium text-gray-800 mb-4">{topic.question.text}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {topic.question.options.map((option, index) => {
                    let btnClass = "p-4 rounded-xl border-2 text-right font-medium transition-all duration-300 ";
                    
                    if (!showResult) {
                      btnClass += "border-gray-200 hover:border-primary hover:bg-primary/5 bg-white text-gray-700";
                    } else {
                      if (index === topic.question.correctAnswer) {
                        btnClass += "border-green-500 bg-green-50 text-green-800";
                      } else if (index === selectedOption) {
                        btnClass += "border-red-500 bg-red-50 text-red-800";
                      } else {
                        btnClass += "border-gray-200 bg-gray-50 text-gray-400 opacity-60";
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
                          {showResult && index === topic.question.correctAnswer && <CheckCircle2 className="text-green-500" size={20} />}
                          {showResult && index === selectedOption && index !== topic.question.correctAnswer && <XCircle className="text-red-500" size={20} />}
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
                      className={`mt-6 p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}
                    >
                      <h4 className={`font-bold mb-1 flex items-center gap-2 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                        {isCorrect ? '✨ إجابة صحيحة يا بطل!' : '💡 محاولة جيدة، لكن ركز شوية!'}
                      </h4>
                      <p className="text-gray-700 leading-relaxed font-medium">
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
                      className="text-primary hover:text-blue-800 font-medium text-sm underline"
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
