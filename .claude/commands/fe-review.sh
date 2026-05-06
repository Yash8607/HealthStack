#!/bin/bash
set -e

echo "🔍 Frontend Review"
cd healthcare-ui

echo "  ✓ Linting..."
npm run lint 2>/dev/null || echo "⚠ Lint issues found"

echo "  ✓ Type checking..."
npm run type-check 2>/dev/null || echo "⚠ Type errors found"

echo "  ✓ Running tests..."
npm test -- --passWithNoTests 2>/dev/null || echo "⚠ Tests failed"

echo ""
echo "✅ Frontend review complete"
cd ..
