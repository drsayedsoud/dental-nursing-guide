import os

# Update App.jsx
app_path = "src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    app_content = f.read()

if "Search" not in app_content:
    app_content = app_content.replace("from 'lucide-react';", ", Search } from 'lucide-react';")

state_code = "  const [searchQuery, setSearchQuery] = useState('');"
if "searchQuery" not in app_content:
    app_content = app_content.replace("const [expandedTopicId, setExpandedTopicId] = useState(null);", state_code + "\n  const [expandedTopicId, setExpandedTopicId] = useState(null);")

search_ui = """
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
"""
if "Search Bar" not in app_content:
    app_content = app_content.replace('<div className="space-y-6">', search_ui + '\n          <div className="space-y-6">')

filter_code = """
    const filteredTopics = topics.filter(topic => 
      topic.title.includes(searchQuery) || 
      topic.content.includes(searchQuery) ||
      topic.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
"""
if "filteredTopics" not in app_content:
    app_content = app_content.replace("return (", filter_code + "\n    return (")
    app_content = app_content.replace("topics.map((topic, index)", "filteredTopics.map((topic, index)")

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_content)

# Update TopicCard.jsx
tc_path = "src/components/TopicCard.jsx"
with open(tc_path, "r", encoding="utf-8") as f:
    tc_content = f.read()

tc_state = "  const [isImageOpen, setIsImageOpen] = useState(false);\n"
if "isImageOpen" not in tc_content:
    tc_content = tc_content.replace("const [showResult, setShowResult] = useState(false);", "const [showResult, setShowResult] = useState(false);\n" + tc_state)

img_code_old = """<img 
                      src={topic.imageUrl} 
                      alt={topic.subtitle}
                      className="absolute inset-0 w-full h-full object-cover"
                    />"""

img_code_new = """<img 
                      src={topic.imageUrl} 
                      alt={topic.subtitle}
                      onClick={() => setIsImageOpen(true)}
                      className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    />"""
tc_content = tc_content.replace(img_code_old, img_code_new)

modal_code = """
      {/* Image Modal */}
      <AnimatePresence>
        {isImageOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 cursor-pointer"
          >
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={topic.imageUrl} 
              alt={topic.subtitle}
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
"""
if "Image Modal" not in tc_content:
    tc_content = tc_content.replace("</motion.div>\n  );\n}", modal_code + "\n    </motion.div>\n  );\n}")

with open(tc_path, "w", encoding="utf-8") as f:
    f.write(tc_content)

print("Patch applied successfully!")
