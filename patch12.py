import os

app_path = "src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add import for FlashcardsMode
if "FlashcardsMode" not in content:
    content = content.replace("import ChapterQuestions from './components/ChapterQuestions';", "import ChapterQuestions from './components/ChapterQuestions';\nimport FlashcardsMode from './components/FlashcardsMode';")

# Add Layers to lucide-react imports
if "Layers" not in content:
    content = content.replace("Download, X,", "Download, X, Layers,")

# Add showFlashcards state
state_code = "  const [showFlashcards, setShowFlashcards] = useState(false);"
if "showFlashcards" not in content:
    content = content.replace("const [expandedTopicId, setExpandedTopicId] = useState(null);", "const [expandedTopicId, setExpandedTopicId] = useState(null);\n" + state_code)

# Add Flashcards button to the header
header_btn_old = """            <div className="flex justify-end items-center mb-4">
              <button 
                onClick={toggleDarkMode}"""
header_btn_new = """            <div className="flex justify-end items-center gap-3 mb-4">
              <button 
                onClick={() => setShowFlashcards(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white transition-colors shadow-lg font-bold"
                title="وضع كروت الذاكرة"
              >
                <Layers size={20} />
                كروت المراجعة
              </button>
              
              <button 
                onClick={toggleDarkMode}"""

content = content.replace(header_btn_old, header_btn_new)

# Add Flashcards component rendering at the end of the app (inside AnimatePresence)
flashcards_component = """
      <AnimatePresence>
        {showFlashcards && <FlashcardsMode onClose={() => setShowFlashcards(false)} />}
      </AnimatePresence>
"""
if "<FlashcardsMode" not in content:
    content = content.replace("{/* PWA Install Banner */}", flashcards_component + "\n      {/* PWA Install Banner */}")

# Add button to Bottom Navigation
bottom_nav_btn = """
          <button 
            onClick={() => setShowFlashcards(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
          >
            <Layers size={20} />
            <span className="text-[10px] font-medium">كروت</span>
          </button>
"""
content = content.replace('<span className="text-[10px] font-medium">بحث</span>\n          </button>', '<span className="text-[10px] font-medium">بحث</span>\n          </button>' + bottom_nav_btn)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch 12 applied successfully!")
