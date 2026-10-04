import os
import re

app_path = "src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update imports to include MessageCircle
content = content.replace("Share2, Moon, Sun, Download, X }", "Share2, Moon, Sun, Download, X, MessageCircle }")

# 2. Remove the Share button from the Header
header_btn_pattern = r'<button\s+onClick=\{shareApp\}[\s\S]*?</button>'
content = re.sub(header_btn_pattern, "", content, count=1)

# 3. Fix the flex alignment in the header after removing the second button
content = content.replace('className="flex justify-between items-center mb-4"', 'className="flex justify-end items-center mb-4"')

# 4. Inject the buttons into the Footer
footer_start = '{/* Footer */}\n      <footer className="mt-16 text-center text-gray-500 pb-8">'
new_footer_start = """{/* Footer */}
      <footer className="mt-16 text-center text-gray-500 pb-8 px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button 
            onClick={shareApp}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Share2 size={20} />
            <span className="font-bold text-lg">مشاركة</span>
          </button>

          <a 
            href="https://wa.me/201066415005?text=%D8%A3%D8%AD%D8%AF%D8%AB%D9%83%D9%85%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%20%D9%85%D9%86%D9%87%D8%AC%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D8%AA%D9%85%D8%B1%D9%8A%D8%B6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle size={20} />
            <span className="font-bold text-lg">راسل المصمم</span>
          </a>
        </div>"""

content = content.replace(footer_start, new_footer_start)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch 3 applied successfully!")
