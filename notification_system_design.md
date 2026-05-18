# Notification System Design

# Stage 1

## Overview

The notification system is designed to help students receive real-time updates related to placements, results, and events. The system follows a separate frontend and backend architecture to maintain scalability and clean code structure.

Frontend communicates with backend APIs, while the backend handles notification processing and logging operations.

## Notification Types

The platform supports the following notification types:

- Event
- Result
- Placement

## Architecture

Frontend (Next.js) -> Backend (Express.js) -> Logging Middleware -> External Notification APIs

# Notification APIs

## 1. Get All Notifications

### Endpoint
`GET /api/notifications`

### Description
Fetch all notifications for a student.

### Headers

```json
{
  "Authorization": "Bearer token"
}

### Response

```json
{
  "success": true,
  "notifications": [
    {
      "id": "101",
      "type": "Placement",
      "message": "TCS is hiring",
      "isRead": false,
      "createdAt": "2026-05-18T10:30:00Z"
    }
  ]
}
```

## 2. Get Notification By ID

### Endpoint
`GET /api/notifications/:id`

### Description
Fetch single notification details.

### Response

```json
{
  "success": true,
  "notification": {
    "id": "101",
    "type": "Event",
    "message": "Hackathon starts tomorrow",
    "isRead": false
  }
}
```
## 3. Mark Notification As Read

### Endpoint
`PATCH /api/notifications/:id/read`

### Description
Update notification read status.

### Response

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

## 4. Delete Notification

### Endpoint
`DELETE /api/notifications/:id`

### Description
Delete notification.

### Response

```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```
---

# Notification Schema

```json
{
  "id": "101",
  "studentId": "STU001",
  "type": "Placement",
  "message": "TCS hiring drive starts tomorrow",
  "isRead": false,
  "priority": 3,
  "createdAt": "2026-05-18T10:30:00Z"
}
```

# Naming Conventions

The APIs follow RESTful naming conventions using clear and predictable endpoint structures.

Examples:
- GET `/api/notifications`
- PATCH `/api/notifications/:id/read`
- DELETE `/api/notifications/:id`

# Realtime Notification Strategy

The system can use WebSockets for realtime notification delivery.

When a new notification is created:
1. Backend processes the notification.
2. WebSocket connection pushes updates instantly to connected students.
3. Frontend updates notification list without page refresh.

This approach helps deliver fast and realtime updates for placements, events, and results.

# Stage 2

## Database Choice

For this system, PostgreSQL can be used because it handles structured relational data efficiently and supports filtering, indexing, and scalability features.

## Notifications Table Structure

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    student_id VARCHAR(50),
    type VARCHAR(20),
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    priority INTEGER,
    created_at TIMESTAMP
);
```

## Table Explanation

- `id` -> Unique notification ID
- `student_id` -> Student receiving notification
- `type` -> Notification category (Placement, Result, Event)
- `message` -> Notification content
- `is_read` -> Read/unread status
- `priority` -> Notification priority level
- `created_at` -> Notification timestamp

## Scalability Strategy

To improve scalability and performance:

- Indexing can be used for faster searches.
- Pagination helps reduce large data loads.
- Caching can reduce repeated database queries.
- Notifications can be fetched in batches for better performance.

# Stage 3

## Analysis of Slow Query

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;
```

## Why This Above Query Can Be Slow

As notification data increases, the query may take more time because of:
- missing indexes
- sorting large records
- using `SELECT *`

## Thus Optimized Query is:

```sql
SELECT id, type, message, created_at
FROM notifications
WHERE student_id = 1042
AND is_read = false
ORDER BY created_at DESC
LIMIT 20;
```

=> This query fetches only required data and improves performance.

# Stage 4

## Performance Improvement Strategy

Fetching notifications every time a page loads can increase database load as the number of users grows. To improve performance, pagination can be used to load notifications in smaller batches instead of fetching all data at once. Caching frequently accessed notifications can also reduce repeated database queries and improve response time. Lazy loading on the frontend helps load data only when needed, making the application faster and smoother. Additionally, fetching only required fields from the database and using optimized queries can further improve scalability and overall system performance.

# Stage 5

## Reliable Mass Notification Strategy

Sending notifications one-by-one can become slow and unreliable when the number of students increases. If one notification fails, the overall process may also get affected. To improve performance and reliability, a queue-based system can be used where notifications are processed asynchronously in the background instead of sending them directly one at a time. Failed notifications can also be retried automatically to avoid data loss. This approach helps reduce server load, improves scalability, and makes the notification system faster and more reliable for large numbers of users.