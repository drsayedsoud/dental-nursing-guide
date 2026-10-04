import os

app_path = "src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

cq_component = """
        <ChapterQuestions 
          isExpanded={expandedTopicId === 'chapter-questions'}
          onToggle={() => setExpandedTopicId(expandedTopicId === 'chapter-questions' ? null : 'chapter-questions')}
        />
      </main>"""

if "<ChapterQuestions" not in content:
    content = content.replace("</main>", cq_component)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch 7 applied successfully!")
