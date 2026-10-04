import os

def replace_colors(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Red to Rose (softer red)
    content = content.replace("red-500", "rose-400")
    content = content.replace("red-600", "rose-500")
    content = content.replace("red-400", "rose-400")
    content = content.replace("red-800", "rose-700")
    content = content.replace("red-50", "rose-50")
    content = content.replace("red-900", "rose-900")
    
    # Orange to Amber (softer, more golden orange)
    content = content.replace("orange-500", "amber-500")
    content = content.replace("orange-400", "amber-400")
    content = content.replace("orange-700", "amber-600")
    content = content.replace("orange-50", "amber-50")
    content = content.replace("orange-200", "amber-200")
    content = content.replace("orange-800", "amber-800")
    content = content.replace("orange-900", "amber-900")

    # Green to Emerald (softer, cooler green)
    content = content.replace("green-500", "emerald-500")
    content = content.replace("green-600", "emerald-500")
    content = content.replace("green-400", "emerald-400")
    content = content.replace("green-800", "emerald-700")
    content = content.replace("green-700", "emerald-600")
    content = content.replace("green-50", "emerald-50")
    content = content.replace("green-200", "emerald-200")
    content = content.replace("green-900", "emerald-900")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

replace_colors("src/components/TopicCard.jsx")
replace_colors("src/App.jsx")
replace_colors("src/components/ChapterQuestions.jsx")

print("Colors softened successfully!")
