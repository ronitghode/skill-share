# 🎓 Skill Share - Professional Documentation

## Welcome to Skill Share! 👋

Skill Share is a modern, skill-based matching platform designed to connect people with complementary abilities. Whether you're looking to learn a new skill or share your expertise, Skill Share makes it easy and engaging.

---

## 🎯 Quick Start

### Run the Application (3 Steps)

#### 1️⃣ Start Backend
```bash
cd skill-share-backend
npm install      # First time only
npm start
```

#### 2️⃣ Start Frontend
```bash
cd skill-share-app
npm install      # First time only
npm start
```

#### 3️⃣ Open Browser
Navigate to: [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```text
skill-share/
├── 📄 README.md             <- You are here
├── ⚙️ .gitignore            <- Project-wide exclusions
├── 📁 skill-share-backend/  <- Express.js API
│   ├── 🔑 .env              <- Environment secrets (Local only!)
│   └── ...
└── 📁 skill-share-app/      <- React Frontend
    └── ...
```

---

## 🛡️ Security & Environment Variables

> [!IMPORTANT]
> The `.env` file contains sensitive information like database credentials and JWT secrets. It is automatically ignored by Git to prevent accidental exposure.

### Required Environment Variables
1. Navigate to `skill-share-backend`.
2. Copy the example file: `cp .env.example .env`.
3. Fill in your credentials:

```env
MONGO_URI        = "your_mongodb_connection_string"
JWT_SECRET       = "your_secure_random_secret"
PORT             = 5005
```

---

## ✨ Key Features

- **👤 Smart Profiles:** Showcase your skills and bio.
- **👀 Discovery:** Intuitive swipe interface to find matches.
- **💙 Likes & Matches:** Real-time feedback when someone likes your profile.
- **💬 Professional Connections:** Build your network through shared skills.

### 🆕 What's New (v1.1.0)
- **Dedicated Likes Page:** See every user who has shown interest in you.
- **Enhanced UI:** Fully responsive design using Tailwind CSS.
- **Refined Matching:** Improved logic for mutual skill-based connections.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, React Router v6, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB + Mongoose
- **Auth:** JWT (JSON Web Tokens), bcryptjs

---

## 📱 Available Pages

| Page | Route | Description |
| :--- | :--- | :--- |
| **Sign Up** | `/signup` | Create your professional account |
| **Sign In** | `/signin` | Access your profile |
| **Home** | `/` | Explore and swipe profiles |
| **Matches** | `/matches` | View your mutual connections |
| **Likes** | `/likes` | **NEW!** See who liked you |
| **Profile** | `/profile` | Manage your skills and bio |

---

## 🚀 Deployment

### Backend (e.g., Heroku/Render)
- Ensure all environment variables are set in your provider's dashboard.
- Set `NODE_ENV` to `production`.

### Frontend (e.g., Vercel/Netlify)
- Update the API base URL to your production backend.
- Run `npm run build` for optimized production assets.

---

## ⚠️ Troubleshooting

- **CORS Errors:** Ensure the backend (`:5005`) and frontend (`:3000`) are both running.
- **DB Connection:** Verify your IP is whitelisted in MongoDB Atlas.
- **Port Conflict:** Use `lsof -i :5005` to find and kill processes occupying the backend port.

---

## ✅ Final Checklist

- [x] Backend `.env` configured
- [x] `npm install` completed in both folders
- [x] MongoDB service is active
- [x] Frontend connected to Backend API

---

**Project:** Skill Share  
**Version:** 1.1.0  
**Status:** ✅ Production Ready & Secured
