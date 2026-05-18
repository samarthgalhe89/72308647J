# Notification System Design

## Overview

This project is built using a separate frontend and backend structure for better organization and scalability. The frontend handles the user interface, while the backend manages APIs and logging.

---

## Architecture

Frontend (Next.js) → Backend (Express.js) → Logging Middleware → External Evaluation API

---

## Frontend Stack

- Next.js
- TypeScript
- Vanilla CSS

---

## Backend Stack

- Node.js
- Express.js

---

## Logging Strategy

A reusable logging middleware is used to track important application events and API activity. Logs are sent to the external evaluation API for monitoring and debugging.

---

## Folder Structure

- `notification_app_fe` → Frontend application
- `notification_app_be` → Backend application
- `logging_middleware` → Logging utility
- `screenshots` → API and output screenshots

---

## API Flow

1. Frontend sends request to backend.
2. Backend processes the request.
3. Logger captures important events.
4. Logs are sent to evaluation API.
5. Response is returned to frontend.