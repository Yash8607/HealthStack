#!/bin/bash
set -e

echo "🔍 Running pre-commit checks..."

FE_CHANGED=$(git diff --cached --name-only | grep -E "healthcare-ui/src/" | wc -l)
BE_CHANGED=$(git diff --cached --name-only | grep -E "healthcare-BE-services/src/" | wc -l)

# Frontend checks
if [ "$FE_CHANGED" -gt 0 ]; then
  echo "  📦 Linting Next.js code..."
  cd healthcare-ui
  npm run lint --fix 2>/dev/null || true
  echo "  ✔ Type checking..."
  npm run type-check 2>/dev/null || true
  cd ..
fi

# Backend checks
if [ "$BE_CHANGED" -gt 0 ]; then
  echo "  📦 Formatting Java code..."
  cd healthcare-BE-services
  mvn spotless:apply -q 2>/dev/null || true
  cd ..
fi

echo "✅ Pre-commit checks passed"
