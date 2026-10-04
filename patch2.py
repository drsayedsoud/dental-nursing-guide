import os
import re

app_path = "src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    app_content = f.read()

# 1. Remove Search Bar and related state
# Remove import
app_content = app_content.replace(", Search }", " }")
# Remove state
app_content = app_content.replace("const [searchQuery, setSearchQuery] = useState('');", "")
# Remove Search UI
search_ui_regex = r"\{/\* Search Bar \*/\}.*?</div>"
app_content = re.sub(search_ui_regex, "", app_content, flags=re.DOTALL)
# Remove filteredTopics logic
filter_logic_regex = r"const filteredTopics = topics\.filter\([\s\S]*?\);\n"
app_content = re.sub(filter_logic_regex, "", app_content)
# Replace filteredTopics.map with topics.map
app_content = app_content.replace("filteredTopics.map", "topics.map")


# 2. Remove the two lines below "د. السيد أبوالسعود"
p_text_regex = r'<p className="text-center text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">[\s\S]*?</p>'
app_content = re.sub(p_text_regex, "", app_content)

# 3. Change share button text to "مشاركة"
app_content = app_content.replace('<span className="font-bold">مشاركة عبر واتساب 👩‍⚕️</span>', '<span className="font-bold">مشاركة</span>')

# 4. Add WakeLock API logic
wake_lock_code = """
  // WakeLock: Keep screen always on
  useEffect(() => {
    let wakeLock = null;
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen');
          console.log('Wake Lock is active!');
        }
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };
    
    requestWakeLock();

    const handleVisibilityChange = () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock !== null) {
        wakeLock.release().then(() => {
          wakeLock = null;
        });
      }
    };
  }, []);
"""

# Insert it before `const toggleDarkMode`
app_content = app_content.replace("const toggleDarkMode", wake_lock_code + "\n  const toggleDarkMode")

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_content)

print("App.jsx patched successfully!")
