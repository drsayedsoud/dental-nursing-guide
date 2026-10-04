import React, { useState, useEffect } from 'react';
import TopicCard from './components/TopicCard';
import { topics } from './data';
import { Stethoscope, HeartPulse, GraduationCap, Share2, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const shareApp = () => {
    const text = "تطبيق أمراض الفم والأسنان - إعداد د. السيد أبوالسعود 👩‍⚕️🏥 شارك التطبيق الآن!";
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`min-h-screen font-['Tajawal'] pb-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900'}`}>
      {/* Header */}
      <header className="bg-primary dark:bg-blue-900 text-white py-12 px-4 shadow-md relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
          <Stethoscope size={300} />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          
          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center justify-center p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="تغيير المظهر"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            
            <button 
              onClick={shareApp}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Share2 size={20} />
              <span className="font-bold">مشاركة عبر واتساب 👩‍⚕️</span>
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-2"
          >
            <HeartPulse size={40} className="text-accent animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg text-white">
              أمراض الفم والأسنان
            </h1>
            <HeartPulse size={40} className="text-accent animate-pulse" />
          </motion.div>

          <h2 className="text-center text-xl md:text-2xl font-bold text-yellow-300 mb-4 drop-shadow-md">
            إعداد د. السيد أبوالسعود
          </h2>

          <p className="text-center text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            ملخص تفاعلي للفصل العاشر - لطلبة التمريض الأبطال 👩‍⚕️👨‍⚕️
            <br />
            بلهجة بسيطة وبطريقة تسهل عليك المذاكرة!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 mt-[-2rem] relative z-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 flex items-center gap-4 border-l-4 border-accent transition-colors duration-300"
        >
          <div className="bg-orange-100 dark:bg-orange-900/40 p-3 rounded-full text-accent flex-shrink-0">
            <GraduationCap size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white text-lg">تعليمات سريعة:</h3>
            <p className="text-gray-600 dark:text-gray-300">اضغط على كل موضوع عشان تشوف الشرح المبسط، وجاوب على السؤال في نهاية كل جزء عشان تختبر فهمك.</p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {topics.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 pb-8">
        <p className="flex items-center justify-center gap-2 mb-2 font-medium">
          تم التصميم بحب لطلبة التمريض <HeartPulse size={16} className="text-red-500" />
        </p>
        <p className="text-sm opacity-70">Dental Care Nursing Guide © 2026</p>
      </footer>
    </div>
  );
}

export default App;
