"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AdminRoute_1 = __importDefault(require("../../../frameworks/routes/adminRoutes/AdminRoute"));
const SuperAdminRoute_1 = __importDefault(require("../../../frameworks/routes/superAdminRoutes/SuperAdminRoute"));
const UserRoute_1 = __importDefault(require("../../../frameworks/routes/userRoutes/UserRoute"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const SocketIo_1 = require("../../services/socketIo/SocketIo");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
class ExpressServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        this.io = (0, SocketIo_1.initializeSocket)(this.server);
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
        this.startServer();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
        const allowedOrigins = [
            "https://elitemediator.shop",
            "https://www.elitemediator.shop"
        ];
        this.app.use((0, cors_1.default)({
            origin: allowedOrigins,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Authorization", "Content-Type"],
            credentials: true,
        }));
        // this.app.use(cors());
        this.app.use((0, cookie_parser_1.default)());
        const publicPath = path_1.default.join(__dirname, '..', 'public');
        this.app.use(express_1.default.static(publicPath));
    }
    configureRoutes() {
        this.app.use("/api", AdminRoute_1.default);
        this.app.use("/user", UserRoute_1.default);
        this.app.use("/superAdmin", SuperAdminRoute_1.default);
        this.app.use('*', (req, res) => {
            res.status(404).json({
                success: false,
                message: 'Route not found'
            });
        });
    }
    configureErrorHandling() {
        this.app.use((err, req, res, next) => {
            const statusCode = err.statusCode || 500;
            const message = err.message || "Internal server error";
            res.status(statusCode).json({
                success: false,
                statusCode,
                message,
            });
        });
    }
    startServer() {
        const port = process.env.PORT || 7000;
        this.server.listen(port, () => {
            console.log(`Express server running on port ${port}`);
        });
    }
}
exports.ExpressServer = ExpressServer;
// To initialize the server, create an instance of ExpressServer
// new ExpressServer();
