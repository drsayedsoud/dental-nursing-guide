import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, X, Layers } from 'lucide-react';
import { topics } from '../data';
import TextWithAudio from './TextWithAudio';

export default function FlashcardsMode({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % topics.length);
    }, 150);
  };

  const prevCard = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + topics.length) % topics.length);
    }, 150);
  };

  const currentTopic = topics[currentIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-gray-900/98 backdrop-blur-sm flex flex-col items-center justify-center p-4"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-rose-400 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-50"
      >
        <X size={28} />
      </button>

      <div className="text-white mb-6 text-center z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Layers className="text-amber-400" size={28} />
          <h2 className="text-3xl font-bold">كروت الذاكرة</h2>
        </div>
        <p className="text-gray-300 font-medium bg-white/10 px-4 py-1 rounded-full inline-block">
          كارت {currentIndex + 1} من {topics.length}
        </p>
      </div>

      {/* The Card */}
      <div 
        className="relative w-full max-w-sm md:max-w-md h-[65vh] [perspective:1000px] cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div 
          className="w-full h-full relative [transform-style:preserve-3d]"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-blue-600 to-primary rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center border-4 border-white/10 group-hover:border-white/30 transition-colors">
            <div className="bg-white/20 p-5 rounded-full mb-8 shadow-inner">
              <RotateCcw size={48} className="text-white opacity-90" />
            </div>
            <h3 className="text-4xl font-black text-white mb-4 leading-tight">{currentTopic.title}</h3>
            <p className="text-2xl text-blue-100 font-medium" dir="ltr">{currentTopic.subtitle}</p>
            
            <div className="absolute bottom-8 flex flex-col items-center animate-bounce">
              <p className="text-white/80 text-sm font-bold bg-black/20 px-4 py-2 rounded-full">اضغط للقلب 👆</p>
            </div>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl flex flex-col p-6 overflow-hidden border-4 border-primary"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="h-40 w-full rounded-xl overflow-hidden mb-4 shrink-0 shadow-md">
              <img src={currentTopic.imageUrl} alt={currentTopic.title} className="w-full h-full object-cover" />
            </div>
            <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2 pb-2 border-b-2 border-amber-400 inline-block">الملخص:</h4>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg whitespace-pre-line text-right">
                <TextWithAudio text={currentTopic.content} />
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-8 z-10" dir="ltr">
        <button 
          onClick={prevCard}
          className="bg-white/10 hover:bg-white/25 text-white p-4 rounded-full transition-colors active:scale-95"
        >
          <ChevronLeft size={32} />
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-colors flex items-center gap-2 active:scale-95"
        >
          <RotateCcw size={20} />
          اقلب
        </button>

        <button 
          onClick={nextCard}
          className="bg-white/10 hover:bg-white/25 text-white p-4 rounded-full transition-colors active:scale-95"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </motion.div>
  );
}
