import React, { useState, useEffect, useRef, useMemo } from 'react';
import TopicCard from './components/TopicCard';
import ChapterQuestions from './components/ChapterQuestions';
import FlashcardsMode from './components/FlashcardsMode';
import { topics } from './data';
import { 
  Stethoscope, HeartPulse, Share2, Moon, Sun, Download, X, Layers, 
  MessageCircle, Search, ArrowUp, Trophy, Home, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  // Theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  // UI State
  const [expandedTopicId, setExpandedTopicId] = useState(null);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  // Quiz Results - persisted in localStorage
  // Shape: { [topicId]: { isCorrect: boolean, selected: number } }
  const [quizResults, setQuizResults] = useState(() => {
    try {
      const saved = localStorage.getItem('quizResults');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const searchRef = useRef(null);

  // Save quiz results to localStorage
  useEffect(() => {
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
  }, [quizResults]);

  // Theme toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // PWA install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // WakeLock: Keep screen always on
  useEffect(() => {
    let wakeLock = null;
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };
    requestWakeLock();
    const handleVisibilityChange = () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock !== null) {
        wakeLock.release().then(() => { wakeLock = null; });
      }
    };
  }, []);

  // Scroll listener for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleQuizComplete = (topicId, isCorrect, selectedOption) => {
    if (isCorrect === null) {
      setQuizResults(prev => {
        const next = { ...prev };
        delete next[topicId];
        return next;
      });
    } else {
      setQuizResults(prev => ({ ...prev, [topicId]: { isCorrect, selected: selectedOption } }));
    }
  };

  const shareApp = () => {
    const text = "تطبيق أمراض الفم والأسنان - إعداد د. السيد أبوالسعود 👩‍⚕️🏥 شارك التطبيق الآن!";
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered topics
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;
    const q = searchQuery.trim().toLowerCase();
    return topics.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.subtitle.toLowerCase().includes(q) ||
      t.content.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Stats
  const totalQuestions = topics.length;
  const answeredCount = Object.keys(quizResults).length;
  const correctCount = Object.values(quizResults).filter(r => r.isCorrect).length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const correctPercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className={`min-h-screen font-['Tajawal'] pb-24 md:pb-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 text-gray-900'}`}>
      
      {/* Progress Bar - Fixed Top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-700">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-r-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Header */}
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 text-white pt-5 pb-8 px-4 shadow-xl relative overflow-hidden transition-colors duration-300">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-[0.07]">
          <Stethoscope size={280} />
        </div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 opacity-[0.05]">
          <HeartPulse size={200} />
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Top Actions */}
          <div className="flex justify-between items-center mb-5">
            <button 
              onClick={() => { setShowSearch(!showSearch); if (!showSearch) setTimeout(() => searchRef.current?.focus(), 200); }}
              className="flex items-center justify-center p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all duration-200"
              title="بحث"
            >
              <Search size={20} />
            </button>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowStatsModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all duration-200 text-sm font-medium"
              >
                <Trophy size={16} />
                <span>{correctCount}/{totalQuestions}</span>
              </button>
              <button 
                onClick={toggleDarkMode}
                className="flex items-center justify-center p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all duration-200"
                title="تغيير المظهر"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Title */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-2"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <HeartPulse size={28} className="text-pink-300 animate-pulse" />
              <h1 className="text-2xl md:text-4xl font-extrabold drop-shadow-lg">
                أمراض الفم والأسنان
              </h1>
              <HeartPulse size={28} className="text-pink-300 animate-pulse" />
            </div>
            <h2 className="text-base md:text-xl font-bold text-yellow-300/90 mb-1">
              إعداد د. السيد أبوالسعود
            </h2>
            <p className="text-blue-200/80 text-xs md:text-base font-medium">
              فصل طب الاسنان - مدارس التمريض
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-3 mt-4"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 text-center border border-white/10">
              <div className="text-lg md:text-xl font-bold">{topics.length}</div>
              <div className="text-[10px] md:text-xs text-blue-200/80">موضوع</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 text-center border border-white/10">
              <div className="text-lg md:text-xl font-bold">{answeredCount}</div>
              <div className="text-[10px] md:text-xs text-blue-200/80">تم حلها</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 text-center border border-white/10">
              <div className="text-lg md:text-xl font-bold text-green-300">{correctCount}</div>
              <div className="text-[10px] md:text-xs text-blue-200/80">صحيحة</div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="relative">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في المواضيع..."
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all text-base"
                  />
                  <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50" />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <p className="text-xs text-blue-200/60 mt-2 text-center">
                    عثرنا على {filteredTopics.length} من {topics.length} موضوع
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Quick Navigation Chips */}
      <div className="container mx-auto max-w-4xl px-4 mt-4 mb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                setExpandedTopicId(topic.id);
                setTimeout(() => {
                  const el = document.getElementById(`topic-${topic.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                expandedTopicId === topic.id
                  ? 'bg-primary text-white border-primary shadow-md'
                  : quizResults[topic.id]
                    ? quizResults[topic.id].isCorrect
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:text-primary dark:hover:text-blue-400'
              }`}
            >
              {topic.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 mt-3 relative z-20">
        {filteredTopics.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">مفيش نتائج لـ &quot;{searchQuery}&quot;</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-3 text-primary hover:underline text-sm"
            >
              مسح البحث
            </button>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {filteredTopics.map((topic, index) => (
              <div key={topic.id} id={`topic-${topic.id}`}>
                <TopicCard 
                  topic={topic} 
                  index={index} 
                  isExpanded={expandedTopicId === topic.id}
                  onToggle={() => setExpandedTopicId(expandedTopicId === topic.id ? null : topic.id)}
                  onQuizComplete={handleQuizComplete}
                  quizResult={quizResults[topic.id] ?? null}
                />
              </div>
            ))}
          </div>
        )}
      
        <ChapterQuestions 
          isExpanded={expandedTopicId === 'chapter-questions'}
          onToggle={() => setExpandedTopicId(expandedTopicId === 'chapter-questions' ? null : 'chapter-questions')}
        />
      </main>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-20 md:bottom-8 left-4 md:left-6 z-40 w-11 h-11 bg-primary hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {showFlashcards && <FlashcardsMode onClose={() => setShowFlashcards(false)} />}
      </AnimatePresence>

      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50 flex flex-col gap-3"
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
              className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-md"
            >
              تثبيت الآن
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Modal */}
      <AnimatePresence>
        {showStatsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStatsModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Trophy size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">ملخص أدائك</h3>
              </div>

              {/* Progress Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-200 dark:text-gray-700" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="url(#statsGradient)" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${(correctCount / Math.max(totalQuestions, 1)) * 264} 264`}
                    />
                    <defs>
                      <linearGradient id="statsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">{correctPercent}%</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">صحيحة</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{totalQuestions}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">إجمالي</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">{correctCount}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">صحيحة</div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-red-600 dark:text-red-400">{answeredCount - correctCount}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">خاطئة</div>
                </div>
              </div>

              {/* Message */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-5">
                {correctCount === totalQuestions && answeredCount === totalQuestions
                  ? '🎉 مبروك! إنت جبت الدرجة النهائية!'
                  : correctCount >= totalQuestions * 0.7 && answeredCount === totalQuestions
                  ? '👏 أداء ممتاز! كمّل كده!'
                  : answeredCount === totalQuestions
                  ? '💪 حاول تاني عشان تحسن نتيجتك!'
                  : `📚 لسة فاضل ${totalQuestions - answeredCount} سؤال، كمّل!`
                }
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setQuizResults({});
                    setShowStatsModal(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  إعادة الكل
                </button>
                <button
                  onClick={() => setShowStatsModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-blue-600 transition-colors shadow-md"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 pb-20 md:pb-8 px-4">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button 
            onClick={shareApp}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-sm font-bold"
          >
            <Share2 size={18} />
            مشاركة
          </button>

          <a 
            href="https://wa.me/201066415005?text=%D8%A3%D8%AD%D8%AF%D8%AB%D9%83%D9%85%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%20%D9%85%D9%86%D9%87%D8%AC%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-sm font-bold"
          >
            <MessageCircle size={18} />
            راسل المصمم
          </a>
        </div>
        <p className="flex items-center justify-center gap-2 mb-2 font-medium text-sm">
          تم التصميم بحب لطلبة التمريض <HeartPulse size={14} className="text-red-500" />
        </p>
                <p className="text-xs opacity-60">Dental Care Nursing Guide © 2026</p>
        <p className="text-[10px] opacity-50 mt-1">المصدر: كتاب الجراحة مدرسة التمريض</p>
      </footer>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 px-2 py-2 flex justify-around items-center safe-area-pb">
          <button 
            onClick={scrollToTop}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
          >
            <Home size={20} />
            <span className="text-[10px] font-medium">الرئيسية</span>
          </button>
          <button 
            onClick={() => { setShowSearch(!showSearch); scrollToTop(); }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${showSearch ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400'}`}
          >
            <Search size={20} />
            <span className="text-[10px] font-medium">بحث</span>
          </button>
          <button 
            onClick={() => setShowFlashcards(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
          >
            <Layers size={20} />
            <span className="text-[10px] font-medium">كروت</span>
          </button>

          <button 
            onClick={() => setShowStatsModal(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
          >
            <BarChart3 size={20} />
            <span className="text-[10px] font-medium">الأداء</span>
          </button>
          <button 
            onClick={shareApp}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
          >
            <Share2 size={20} />
            <span className="text-[10px] font-medium">مشاركة</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
