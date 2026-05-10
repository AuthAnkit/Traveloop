# Traveloop — India-Focused Intelligent Travel Planner

A production-grade, multi-user travel planning SaaS built with Spring Boot + React, localized for the Indian market with intelligent destination recommendations.

---

## Tech Stack

| Layer    | Technology                                                        |
|----------|-------------------------------------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS, React Router, Axios, @dnd-kit, Recharts |
| Backend  | Java 17, Spring Boot 3.2, Spring Security, JWT (jjwt 0.12)       |
| Database | PostgreSQL 16                                                     |
| ORM      | JPA / Hibernate                                                   |
| Docs     | Springdoc OpenAPI / Swagger UI                                    |
| Deploy   | Docker Compose                                                    |

---

## Architecture

```
traveloop/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/traveloop/
│   │   ├── config/          # Security, CORS, Swagger
│   │   ├── security/        # JWT provider, filter, UserDetails
│   │   ├── entity/          # JPA entities (11 tables)
│   │   ├── repository/      # Spring Data JPA
│   │   ├── dto/             # Request + Response DTOs
│   │   ├── service/         # Business logic
│   │   ├── controller/      # REST endpoints
│   │   └── exception/       # Global error handler
│   └── pom.xml
└── frontend/                # React SPA
    └── src/
        ├── api/             # Axios API layer
        ├── context/         # Auth + Theme context
        ├── pages/           # Route-level pages
        └── components/      # Reusable UI components
```

---

## Database Schema (11 Tables)

| Table             | Purpose                              |
|-------------------|--------------------------------------|
| `users`           | Authentication & profile             |
| `trips`           | Core trip entity                     |
| `cities`          | Global city catalog                  |
| `trip_stops`      | Multi-city ordered stops             |
| `activities`      | Activities per city                  |
| `stop_activities` | Many-to-many: stops ↔ activities      |
| `trip_budgets`    | Auto-calculated budget per trip      |
| `packing_items`   | Categorized packing checklist        |
| `trip_notes`      | Journal entries per trip/stop        |
| `shared_trips`    | Public share links with view tracking|
| `analytics_events`| Platform usage tracking              |
| `popular_places`  | Indian destination recommendations   |

---

## API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/users/me
PUT    /api/users/me
GET    /api/users/dashboard

GET    /api/trips
POST   /api/trips
GET    /api/trips/{id}
PUT    /api/trips/{id}
PATCH  /api/trips/{id}/status
DELETE /api/trips/{id}

GET    /api/trips/{id}/stops
POST   /api/trips/{id}/stops
PUT    /api/stops/{stopId}
DELETE /api/stops/{stopId}
PUT    /api/trips/{id}/stops/reorder

POST   /api/stops/{stopId}/activities
DELETE /api/stop-activities/{id}

GET    /api/trips/{id}/budget
PUT    /api/trips/{id}/budget

GET    /api/trips/{id}/packing
POST   /api/trips/{id}/packing
PATCH  /api/trips/{id}/packing/items/{itemId}/toggle
DELETE /api/trips/{id}/packing/items/{itemId}
POST   /api/trips/{id}/packing/reset

GET    /api/trips/{id}/notes
POST   /api/trips/{id}/notes
PUT    /api/trips/{id}/notes/{noteId}
DELETE /api/trips/{id}/notes/{noteId}

POST   /api/trips/{id}/share
DELETE /api/trips/{id}/share
GET    /api/shared/{slug}        ← public, no auth required

GET    /api/cities?q=paris
GET    /api/cities/popular
GET    /api/cities/{id}/activities

GET    /api/places/state/{state}
GET    /api/places/city/{city}
GET    /api/places/recommended/{city}
POST   /api/stops/{stopId}/activities/from-place/{placeId}
```

Swagger UI: `http://localhost:8080/swagger-ui.html`

---

## Quick Start

### Option 1: Docker Compose (recommended)

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html

### Option 2: Manual

**Backend**
```bash
# Start PostgreSQL on port 5432 (database: traveloop)
cd backend
mvn spring-boot:run
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## Pages

| Route                         | Description               | Auth |
|-------------------------------|---------------------------|------|
| `/`                           | Landing page              | No   |
| `/login`                      | Sign in                   | No   |
| `/register`                   | Create account            | No   |
| `/trip/:slug`                 | Public shared itinerary   | No   |
| `/app/dashboard`              | Dashboard with stats      | Yes  |
| `/app/trips`                  | All trips (filter by status)| Yes |
| `/app/trips/new`              | Create trip               | Yes  |
| `/app/trips/:id/builder`      | Drag-drop itinerary builder| Yes |
| `/app/trips/:id/view`         | Timeline itinerary view   | Yes  |
| `/app/trips/:id/budget`       | Budget with pie/bar charts| Yes  |
| `/app/trips/:id/packing`      | Categorized packing list  | Yes  |
| `/app/trips/:id/notes`        | Journal / notes           | Yes  |
| `/app/profile`                | User profile & settings   | Yes  |

---

## Key Features

- **Intelligent Recommendations** — Context-aware popular place suggestions (e.g., Baga Beach for Goa)
- **Automatic Database Seeding** — Auto-populates 50+ Indian cities and activities on startup
- **Indian Localization** — Full ₹ INR currency formatting and Indian travel aesthetics
- **JWT Auth** — Stateless authentication, token stored in localStorage
- **Drag-and-Drop** — City reordering with @dnd-kit/sortable
- **Real-time Budget** — Pie + bar charts update as you type (Recharts) with Per-Person calculator
- **Public Sharing** — UUID-based slug, view count tracking
- **Dark Mode** — System-aware, persisted in localStorage
- **Fully Responsive** — Mobile-first layout with collapsible sidebar
- **Swagger Docs** — All APIs documented and testable at /swagger-ui.html
