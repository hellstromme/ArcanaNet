# ArcanaNet

ArcanaNet is an online platform for running tabletop role-playing games with integrated character
sheet management, a real-time dice roller, and an extensible plugin system for multiple game
systems.

## Project Structure

The repository is organised as a TypeScript monorepo with separate frontend and backend
applications:

- `backend/` — NestJS-based API providing authentication, campaign management, plugin manifests,
  character/NPC sheets, and a Socket.IO dice gateway.
- `frontend/` — Next.js application delivering the web client, including dashboards and a live dice
  roller interface.

## Getting Started

### Backend

```bash
cd backend
npm install
npm run start:dev
```

The API will boot on http://localhost:3001 and expose the following starter routes:

- `GET /health` — service health check.
- `POST /auth/register` and `POST /auth/login` — placeholder authentication endpoints.
- `GET /games` & `POST /games` — in-memory game session management.
- `GET /sheets/:ownerId` & `POST /sheets` — in-memory sheet management.
- `GET /plugins/systems` — list available game system manifests.
- `WS /dice` — Socket.IO namespace for dice rolling (`roll` event → `roll-result`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Next.js dev server starts on http://localhost:3000 with:

- Landing page linking to the dashboard and dice roller.
- Dashboard mock data for campaigns and plugin manager.
- Dice roller page connecting to the backend Socket.IO gateway.

## Next Steps

- Replace in-memory stores with PostgreSQL (via Prisma) and Redis caches.
- Implement robust authentication (JWT/session) and role-based permissions.
- Build plugin discovery, validation, and runtime loading for custom systems.
- Add collaborative real-time features for sheets, chat, and shared notes.
- Integrate WebGL-based 3D dice renderer within the dice roller page.
