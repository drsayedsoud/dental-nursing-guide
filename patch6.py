import os
import re

app_path = "src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add ChapterQuestions import
if "ChapterQuestions" not in content:
    content = content.replace("import TopicCard from './components/TopicCard';", "import TopicCard from './components/TopicCard';\nimport ChapterQuestions from './components/ChapterQuestions';")

# 2. Add ChapterQuestions component inside main
cq_code = """            ))}
          </div>

          <ChapterQuestions 
            isExpanded={expandedTopicId === 'chapter-questions'}
            onToggle={() => setExpandedTopicId(expandedTopicId === 'chapter-questions' ? null : 'chapter-questions')}
          />
      </main>"""

if "<ChapterQuestions" not in content:
    content = content.replace("            ))}\n          </div>\n      </main>", cq_code)

# 3. Add the source text in the footer
source_text = """        <p className="text-xs opacity-60">Dental Care Nursing Guide © 2026</p>
        <p className="text-[10px] opacity-50 mt-1">المصدر: كتاب الجراحة مدرسة التمريض</p>"""

if "المصدر: كتاب الجراحة مدرسة التمريض" not in content:
    content = content.replace('<p className="text-xs opacity-60">Dental Care Nursing Guide © 2026</p>', source_text)


with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch 6 applied successfully!")
