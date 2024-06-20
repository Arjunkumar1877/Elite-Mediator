import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import adminRoutes from "../../../frameworks/routes/adminRoutes/AdminRoute";
import superAdminRoute from "../../../frameworks/routes/superAdminRoutes/SuperAdminRoute";
import userRoutes from '../../../frameworks/routes/userRoutes/UserRoute'
import cors from "cors";
import path from "path";
import { createServer, Server as HTTPServer } from 'http';
import { initializeSocket } from "../../services/socketIo/SocketIo";
import {Server as SocketIoServer } from 'socket.io';

export class ExpressServer {
    private app: Application;
    private server: HTTPServer;
    private io: SocketIoServer;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.io = initializeSocket(this.server);

        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
        this.startServer();
    }

    private configureMiddleware(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(cookieParser());
    }

    private configureRoutes(): void {
        this.app.use("/api", adminRoutes);
        this.app.use("/user", userRoutes);
        this.app.use("/superadmin", superAdminRoute);
    }

    private configureErrorHandling(): void {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            const statusCode: number = err.statusCode || 500;
            const message = err.message || "Internal server error🤷🤷";
            res.status(statusCode).json({
                success: false,
                statusCode: false,
                message,
            });
        });
    }





    private startServer(): void {
        this.server.listen(7000, () => {
            console.log("Express server running on port 7000");
        });
    }
}
