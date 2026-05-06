#!/bin/bash

FILE=$1
FE_PATTERN="healthcare-ui/src"
BE_PATTERN="healthcare-BE-services/src"

if [[ $FILE =~ $FE_PATTERN ]]; then
  if [[ $FILE == *.ts || $FILE == *.tsx ]]; then
    echo "🔧 Formatting $FILE..."
    npx prettier --write "$FILE" 2>/dev/null &
    npx eslint "$FILE" --fix 2>/dev/null &
  fi
elif [[ $FILE =~ $BE_PATTERN ]]; then
  if [[ $FILE == *.java ]]; then
    echo "🔧 Formatting $FILE..."
    (cd healthcare-BE-services && mvn spotless:apply -q -DspotlessIdeHook) &
  fi
fi

wait
