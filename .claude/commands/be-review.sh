#!/bin/bash
set -e

echo "🔍 Backend Review"
cd healthcare-BE-services

echo "  ✓ Checking format..."
mvn spotless:check -q 2>/dev/null || echo "⚠ Format issues found"

echo "  ✓ Running tests..."
mvn test -q 2>/dev/null || echo "⚠ Tests failed"

echo "  ✓ Checking migrations..."
ls -la src/main/resources/db/migration/ | grep "V[0-9]" || echo "⚠ No migrations found"

echo ""
echo "✅ Backend review complete"
cd ..
