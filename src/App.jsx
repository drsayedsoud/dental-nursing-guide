import React from 'react';
import TopicCard from './components/TopicCard';
import { topics } from './data';
import { Stethoscope, HeartPulse, GraduationCap, Github } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-['Tajawal'] pb-12">
      {/* Header */}
      <header className="bg-primary text-white py-12 px-4 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
          <Stethoscope size={300} />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <HeartPulse size={40} className="text-accent animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg">
              أمراض الفم والأسنان
            </h1>
            <HeartPulse size={40} className="text-accent animate-pulse" />
          </motion.div>
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
          className="bg-white rounded-xl shadow-md p-6 mb-8 flex items-center gap-4 border-l-4 border-accent"
        >
          <div className="bg-orange-100 p-3 rounded-full text-accent">
            <GraduationCap size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">تعليمات سريعة:</h3>
            <p className="text-gray-600">اضغط على كل موضوع عشان تشوف الشرح المبسط، وجاوب على السؤال في نهاية كل جزء عشان تختبر فهمك.</p>
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
