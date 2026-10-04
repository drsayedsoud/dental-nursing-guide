import os

file_path = "src/components/ChapterQuestions.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

import_str = "import { playAudio } from './TextWithAudio';\n"
if "playAudio" not in content:
    content = content.replace("import { chapterQuestions } from '../questionsData';", "import { chapterQuestions } from '../questionsData';\n" + import_str)

q_html_old = """                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                    <span className="text-primary mr-2">Q{index + 1}.</span> 
                    {q.question}
                  </h3>"""

q_html_new = """                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-start justify-between">
                    <div>
                      <span className="text-primary mr-2">Q{index + 1}.</span> 
                      {q.question}
                    </div>
                    <button 
                      onClick={(e) => playAudio(q.question, e)}
                      className="text-primary dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 p-2 rounded-full transition-colors shrink-0 ml-2"
                      title="Listen"
                    >
                      <Volume2 size={18} />
                    </button>
                  </h3>"""

if "playAudio" not in content:
    content = content.replace(q_html_old, q_html_new)
    # import Volume2
    content = content.replace("CheckCircle2 } from 'lucide-react';", "CheckCircle2, Volume2 } from 'lucide-react';")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch 9 applied successfully!")
