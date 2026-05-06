---
name: stitch-fe-builder
description: >
  Use this skill when the user wants to create one exact frontend page from a Google Stitch screen
  into the healthcare-ui React project. Trigger when the user provides a custom page name and
  a Stitch screen/page ID, or says things like: "create this page from Stitch", "build exact page",
  "same as Stitch design", "generate one page", "clone this screen", "use page id",
  "build home page from Stitch", "create page from Stitch ID", or "convert Stitch screen to React".
---

# Stitch FE Builder

Build exactly **one Stitch screen at a time** as a frontend page inside `healthcare-ui/`.

This skill is for **page-by-page generation**, not bulk import.

## Main Goal

Recreate one Stitch screen as closely as possible in React/TypeScript using the user's custom page name.

Focus on matching the Stitch design:
- layout
- spacing
- section order
- cards
- buttons
- colors
- typography
- images/icons
- responsiveness

Do not redesign the screen unless required by the project.

---

## Required Input

The user should provide:

```text
/custom command or prompt + customPageName + stitchScreenId