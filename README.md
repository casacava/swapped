# 🔁 Swapped

Swapped is a modern web app that helps people **exchange skills** instead of money. Whether you're offering Pilates lessons, guitar tutorials, or coding help — Swapped makes it easy to connect, match, and collaborate. 🧑‍🏫🤝🧑‍🎨

Built as a portfolio piece to showcase product thinking, frontend polish, and backend architecture.

---

## 🚀 Tech Stack

| Tool            | Description                                 |
|-----------------|---------------------------------------------|
| ⚛️ React        | UI library for building dynamic interfaces  |
| ⛓️ Next.js 14   | Framework for routing, layouts, and tooling |
| 🧠 TypeScript   | Static typing for safety and scalability    |
| 🎨 Tailwind CSS | Utility-first styling with full customizability |
| 📦 Jest + ESLint| Code quality and style enforcement          |
| 🌊 Supabase     | Backend: Postgres DB, Auth (email + Google), Row-level Security      |

---

## ✅ Current Features
- ✍️ User authentication via Supabase (Email + Google OAuth)
- 🌟 Onboarding flow capturing username, gender, skills, bio, zipcode, and profile picture
- 🧑‍💻 Real-time skill matching based on skills offered and wanted
- 💬 Messaging only enabled when a skill match exists
- 📦 Auto-created conversations, tied to the matched skill
- 🖼️ Avatar upload + delete, stored in Supabase Storage
- ✏️ Editable profiles with immediate DB sync

---

## 🛠️ Backend Overview (Supabase)
Swapped uses Supabase for its backend — combining a hosted Postgres database, auth, storage, and real-time features with row-level security.

Key backend architecture includes:
- 🧩 Normalized schema for users, profiles, swaps, and conversations
- 🔐 Role-Based Access Control using Row-Level Security (RLS)
- 🔁 Skill-based matching logic to connect users via shared interests
- 📨 Messaging system design that restricts chat to only matched skills
- 🖼️ Storage buckets for user avatars with signed URLs + delete permissions
- 🔄 Real-time updates (e.g. checking username availability, updating profile data instantly)
- 🧱 Designed for scalability and moderation, with future hooks for AI tooling

---
## 🔮 Upcoming Features

- 🛡️ Mod tools to flag or review inappropriate images
- 🧭 Filter by skill category and zipcode
- 🤖 AI Safety Screening
  - Flag scammy, inappropriate, or illegal messages
- 🧞‍♀️ AI Chatbot Assistant
  -   Guide users with onboarding tips and FAQs (e.g. “How does swapped work?”)

---
## 🎯 Status
Swapped is actively under development, with a focus on delivering clean UX, secure backend logic, and thoughtful community-first features. This project highlights the full stack capabilities of a frontend-leaning engineer with a product mindset.
