# Backend — Real-Time Vehicle Monitoring System
This is the Express + Socket.io backend for the Real-Time Vehicle Monitoring System.

## Prerequisites
- Node.js v18+ (or LTS)
- npm
- MongoDB instance (local or cloud)

## Environment variables
Create a `.env` file in the `backend/` directory with at least:

```
MONGO_URI=mongodb://localhost:27017/your_db_name
PORT=5000
```

## Install
```bash
cd backend
npm install
```

## Development
```bash
npm run dev
```

This runs `nodemon server.js` and starts the server with live reload.

## Run in production
```bash
node server.js
```

## Simulator
The telemetry simulator is located in `backend/simulator/` (C++). To build it you need a C++ toolchain and libcurl. Example compile command used previously on Windows (MinGW):

```bash
# from backend/simulator
g++ vehicle_simulator.cpp -o simulator.exe -IC:/curl/include -LC:/curl/lib -lcurl
```

Then run `simulator.exe` to emit simulated telemetry to the backend.
Run the simulator after building (adjust path/flags for your platform):

```bash
# Windows
./simulator.exe

# Linux / macOS
./simulator
```

Simulator behavior:
- By default it will connect to the backend server at `http://localhost:5000` (adjustable in the simulator source), and emit telemetry and alert events similar to the real device.
- If you modify the backend port or host, update the simulator source or runtime flags accordingly. 
Build requirements:
- A C++ toolchain (GCC/MinGW on Windows, g++/clang on Linux/macOS)
- `libcurl` development headers and libraries for HTTP/POST or websocket integration inside folder `/backend/simulator`

## API Endpoints (examples)
- `GET /api/telemetry/history` — fetch telemetry history
- `GET /api/alerts/history` — fetch alert history
- `PUT /api/settings` - update settings
- `POST /api/telemetry` - receive telemetry

## WebSocket events
- Server emits `telemetry-update` with latest telemetry
- Server emits `alert-created` when a new alert is generated

## Notes
- The server expects `MONGO_URI` to be set for MongoDB access. If not provided, the server will exit.
- Socket.io CORS is configured to allow the frontend default origin `http://localhost:5173`.
