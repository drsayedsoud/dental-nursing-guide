import os

app_path = "src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add subtitle below the name
target_str = """            <h2 className="text-center text-xl md:text-2xl font-bold text-yellow-300 mb-4 drop-shadow-md">
              إعداد د. السيد أبوالسعود
            </h2>"""

new_str = """            <h2 className="text-center text-xl md:text-2xl font-bold text-yellow-300 mb-2 drop-shadow-md">
              إعداد د. السيد أبوالسعود
            </h2>
            <p className="text-center text-blue-100 text-lg md:text-xl font-medium mb-6">
              (فصل طب الاسنان - مدارس التمريض)
            </p>"""

if "فصل طب الاسنان" not in content:
    content = content.replace(target_str, new_str)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch 4 applied successfully!")
