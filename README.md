# Bitespeed Identity Reconciliation Service

This repository implements the **Bitespeed** backend task for *Identity Reconciliation* using **Express.js**, **TypeScript**, **Prisma**, and **PostgreSQL**.

---

## Table of Contents

* [Features](#features)

* [Prerequisites](#prerequisites)

* [Getting Started](#getting-started)
  * [1. Clone Repository](#1-clone-repository)
  * [2. Environment Variables](#2-environment-variables)
  * [3. Install Dependencies](#3-install-dependencies)
  * [4. Generate Prisma Client](#4-generate-prisma-client)
  * [5. Database Migrations](#5-database-migrations)
  * [6. Run Locally](#6-run-locally)

* [Scripts](#scripts)

---

## Features

* **/identify** endpoint to link multiple contacts by email and/or phone.
* Input normalization (email lower‐case, phone digits).
* Recursive grouping and primary/secondary precedence.
* Transactional operations for consistency.

---

## Prerequisites

* **Node.js** v18+
* **npm** v8+
* **PostgreSQL** database

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/girishmahale786/Bitespeed-Identity-Reconciliation.git
cd Bitespeed-Identity-Reconciliation
```

### 2. Environment Variables

Create a `.env` in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 3. Install Dependencies

````bash
npm install
````

### 4. Generate Prisma Client
```bash
npm run prisma:generate
````

### 5. Database Migrations

* **Development** (creates or resets local schema):

  ```bash
  npm run prisma:migrate:dev -- --name init
  ```
* **Production** (applies existing SQL without resetting):

  ```bash
  npm run prisma:migrate:prod
  ```

### 6. Run Locally

* **Development** (Hot‐reload):

  ```bash
  npm run dev    # uses nodemon src/app.ts
  ```
* **Build + Start**:

  ```bash
  npm run build
  npm start
  ```

---

## Scripts

| Script                        | Description                        |
| ----------------------------- | ---------------------------------- |
| `npm run dev`                 | Run in development with hot‐reload |
| `npm run build`               | Compile TypeScript to `dist/`      |
| `npm start`                   | Run compiled code                  |
| `npm run prisma:generate`     | Generate Prisma client             |
| `npm run prisma:migrate:dev`  | Run local dev migrations           |
| `npm run prisma:migrate:prod` | Deploy migrations in prod          |

---
