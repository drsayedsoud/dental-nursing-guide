import React, { useState, useEffect } from 'react';
import TopicCard from './components/TopicCard';
import { topics } from './data';
import { Stethoscope, HeartPulse, GraduationCap, Share2, Moon, Sun, Download, X } , Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    
    const filteredTopics = topics.filter(topic => 
      topic.title.includes(searchQuery) || 
      topic.content.includes(searchQuery) ||
      topic.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

      const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState(null);

    const shareApp = () => {
      const text = "تطبيق أمراض الفم والأسنان - إعداد د. السيد أبوالسعود 👩‍⚕️🏥 شارك التطبيق الآن!";
      const url = window.location.href;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`;
      window.open(whatsappUrl, '_blank');
    };

    
    const filteredTopics = topics.filter(topic => 
      topic.title.includes(searchQuery) || 
      topic.content.includes(searchQuery) ||
      topic.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        <main className="container mx-auto max-w-4xl px-4 mt-6 relative z-20">
          
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="ابحث عن أي مرض أو عرض طبي..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl py-4 pr-12 pl-4 text-lg focus:outline-none focus:border-primary transition-colors text-gray-800 dark:text-white"
          />
        </div>

          <div className="space-y-6">
            {filteredTopics.map((topic, index) => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                index={index} 
                isExpanded={expandedTopicId === topic.id}
                onToggle={() => setExpandedTopicId(expandedTopicId === topic.id ? null : topic.id)}
              />
            ))}
          </div>
      </main>

      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-primary/20 p-4 z-50 flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Download className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">تثبيت التطبيق</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">ثبت التطبيق للوصول إليه بدون إنترنت</p>
                </div>
              </div>
              <button 
                onClick={() => setShowInstallBanner(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <button
              onClick={handleInstallClick}
              className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
            >
              تثبيت الآن
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
