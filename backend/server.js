const http = require("http");

const { Server } = require("socket.io");

require("dotenv").config();

const app = require("./app");

const connectDB = require("./src/config/db.js");

const setupSocket =
    require("./src/sockets/telemetrySocket.js");

const {
    setSocketInstance
} = require("./src/controllers/telemetryController.js");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

setupSocket(io);

setSocketInstance(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});