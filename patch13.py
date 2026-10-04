import os

app_path = "src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

target = """                <button 
                  onClick={toggleDarkMode}"""

new_btn = """                <button 
                  onClick={() => setShowFlashcards(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white transition-all duration-200 shadow-lg font-bold"
                  title="وضع كروت الذاكرة"
                >
                  <Layers size={18} />
                  <span className="hidden sm:inline">كروت المراجعة</span>
                </button>
                <button 
                  onClick={toggleDarkMode}"""

if "كروت المراجعة" not in content:
    content = content.replace(target, new_btn)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed header button!")
