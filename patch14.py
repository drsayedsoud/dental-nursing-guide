import os

file_path = "src/components/TopicCard.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Soften BADGE_COLORS
old_badge_colors = """const BADGE_COLORS = [
  'bg-gradient-to-br from-blue-500 to-blue-600',
  'bg-gradient-to-br from-rose-500 to-rose-600',
  'bg-gradient-to-br from-amber-500 to-amber-600',
  'bg-gradient-to-br from-emerald-500 to-emerald-600',
  'bg-gradient-to-br from-purple-500 to-purple-600',
  'bg-gradient-to-br from-orange-500 to-orange-600',
  'bg-gradient-to-br from-pink-500 to-pink-600',
  'bg-gradient-to-br from-teal-500 to-teal-600',
  'bg-gradient-to-br from-indigo-500 to-indigo-600',
  'bg-gradient-to-br from-cyan-500 to-cyan-600',
  'bg-gradient-to-br from-lime-600 to-lime-700',
];"""

new_badge_colors = """const BADGE_COLORS = [
  'bg-gradient-to-br from-blue-400 to-blue-500 opacity-90',
  'bg-gradient-to-br from-rose-400 to-rose-500 opacity-90',
  'bg-gradient-to-br from-amber-400 to-amber-500 opacity-90',
  'bg-gradient-to-br from-emerald-400 to-emerald-500 opacity-90',
  'bg-gradient-to-br from-purple-400 to-purple-500 opacity-90',
  'bg-gradient-to-br from-orange-400 to-orange-500 opacity-90',
  'bg-gradient-to-br from-pink-400 to-pink-500 opacity-90',
  'bg-gradient-to-br from-teal-400 to-teal-500 opacity-90',
  'bg-gradient-to-br from-indigo-400 to-indigo-500 opacity-90',
  'bg-gradient-to-br from-cyan-400 to-cyan-500 opacity-90',
  'bg-gradient-to-br from-lime-500 to-lime-600 opacity-90',
];"""

if "from-blue-500 to-blue-600" in content:
    content = content.replace(old_badge_colors, new_badge_colors)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Badge colors softened!")
