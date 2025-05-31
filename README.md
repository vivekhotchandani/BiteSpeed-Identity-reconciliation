# 🧠 Bitespeed Identity Reconciliation

A backend service to resolve and unify user identities using phone numbers and email addresses.
Built with **Express.js**, **TypeScript**, **Prisma**, and **PostgreSQL**.

---

## ✨ Features

* `/identify` endpoint to find or link contacts
* Supports linking via **email** and/or **phone number**
* Handles **recursive relationships**
* Maintains **primary/secondary** contact consistency
* Uses **transactions** for safe updates
* Lightweight and efficient design

---

## 🔗 Live Demo

* **Identify Endpoint**:
  📬 POST → `/identify`
  🔗 [Try it](https://bitespeed-identity-reconciliation-bzce.onrender.com/identify)

---

## ⚙️ Prerequisites

Before running this project, ensure you have:

* ✅ Node.js v18+
* ✅ npm v8+
* ✅ PostgreSQL database setup

---

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/vivekhotchandani/Bitespeed-Identity-Reconciliation.git
   cd Bitespeed-Identity-Reconciliation
   ```

2. **Set up environment variables**

   Create a `.env` file in the root with:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Generate Prisma client**

   ```bash
   npm run prisma:generate
   ```

5. **Run migrations**

   * For development:

     ```bash
     npm run prisma:migrate:dev -- --name init
     ```

   * For production:

     ```bash
     npm run prisma:migrate:prod
     ```

6. **Start the server**

   * Development (auto-reloads):

     ```bash
     npm run dev
     ```

   * Production build:

     ```bash
     npm run build
     npm start
     ```

---

## 📜 Scripts Overview

Use these scripts during development or deployment:

* `npm run dev` → Start dev server with hot-reload
* `npm run build` → Compile TypeScript files
* `npm start` → Run compiled production server
* `npm run prisma:generate` → Generate Prisma client
* `npm run prisma:migrate:dev` → Dev DB migration
* `npm run prisma:migrate:prod` → Prod DB migration

---
