#!/bin/bash

echo "🏗️  Architecture Check"

echo "  ✓ Checking FE module structure..."
ls -la healthcare-ui/src/features/ | tail -n +4 | awk '{print "    - " $NF}'

echo "  ✓ Checking BE service structure..."
ls -la healthcare-BE-services/src/main/java/com/healthcare/service/ | tail -n +4 | awk '{print "    - " $NF}'

echo "  ✓ Checking API endpoints..."
grep -r "@PostMapping\|@GetMapping\|@PutMapping" healthcare-BE-services/src/main/java/com/healthcare/api/v1/controller/ 2>/dev/null | wc -l
echo "    Found $(grep -r "@PostMapping\|@GetMapping\|@PutMapping" healthcare-BE-services/src/main/java/com/healthcare/api/v1/controller/ 2>/dev/null | wc -l) endpoints"

echo ""
echo "✅ Architecture check complete"
