import os

file_path = "src/components/TopicCard.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Soften the Number Badge (bg-orange-500 to bg-amber-500)
content = content.replace("'bg-orange-500 text-white'", "'bg-amber-500 text-white'")

# 2. Soften the subtitle line (bg-orange-400 to bg-amber-400)
content = content.replace("bg-orange-400", "bg-amber-400")

# 3. Change the harsh red arrow to a nice blue/primary color (bg-red-500 to bg-blue-500)
content = content.replace("'bg-red-500 text-white rotate-180'", "'bg-blue-500 text-white rotate-180'")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch applied for TopicCard header colors!")
