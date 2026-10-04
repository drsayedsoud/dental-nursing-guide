import os

file_path = "src/components/TopicCard.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add import
import_str = "import TextWithAudio from './TextWithAudio';\n"
if "TextWithAudio" not in content:
    content = content.replace("import { motion, AnimatePresence } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';\n" + import_str)

# Replace topic.subtitle
content = content.replace("{topic.subtitle}", "<TextWithAudio text={topic.subtitle} />")

# Replace topic.content
content = content.replace("{topic.content}", "<TextWithAudio text={topic.content} />")

# Replace topic.question.text
content = content.replace("{topic.question.text}", "<TextWithAudio text={topic.question.text} />")

# Replace topic.question.explanation
content = content.replace("{topic.question.explanation}", "<TextWithAudio text={topic.question.explanation} />")


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch 8 applied successfully!")
