#!/bin/bash

# Directory to process
DIRECTORY=${1:-.} # Default to current directory if no argument is provided

# Rename .tsx to .jsx
find "$DIRECTORY" -type f -name "*.tsx" | while read -r file; do
  new_file="${file%.tsx}.jsx"
  mv "$file" "$new_file"
  echo "Renamed: $file -> $new_file"
done

# Rename .ts to .js
find "$DIRECTORY" -type f -name "*.ts" | while read -r file; do
  # Avoid renaming .tsx files that were already renamed
  if [[ "${file##*.}" == "ts" ]]; then
    new_file="${file%.ts}.js"
    mv "$file" "$new_file"
    echo "Renamed: $file -> $new_file"
  fi
done

echo "All files renamed successfully!"
