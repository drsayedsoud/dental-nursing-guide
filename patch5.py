import os

app_path = "src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add import
import_str = "import ChapterQuestions from './components/ChapterQuestions';\n"
if "ChapterQuestions" not in content:
    content = content.replace("import TopicCard from './components/TopicCard';", "import TopicCard from './components/TopicCard';\n" + import_str)

# Add state for chapter questions accordion
cq_state = "  const [showChapterQuestions, setShowChapterQuestions] = useState(false);"
if "showChapterQuestions" not in content:
    content = content.replace("const [expandedTopicId, setExpandedTopicId] = useState(null);", "const [expandedTopicId, setExpandedTopicId] = useState(null);\n" + cq_state)

# Inject the component right before the closing main tag
cq_component = """
          <ChapterQuestions 
            isExpanded={showChapterQuestions}
            onToggle={() => setShowChapterQuestions(!showChapterQuestions)}
          />
      </main>"""

if "<ChapterQuestions" not in content:
    content = content.replace("</main>", cq_component)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch 5 applied successfully!")
