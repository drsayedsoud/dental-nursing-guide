import os

app_path = "src/App.jsx"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

start_marker = "{/* Quick Navigation Chips */}"
end_marker = "      {/* Main Content */}"

if start_marker in content and end_marker in content:
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    # Remove the section
    content = content[:start_idx] + content[end_idx:]
    
    with open(app_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Quick Navigation Chips removed!")
else:
    print("Could not find the markers.")
