import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import adminRoutes from "../../../frameworks/routes/adminRoutes/AdminRoute";
import superAdminRoute from "../../../frameworks/routes/superAdminRoutes/SuperAdminRoute";
import userRoutes from '../../../frameworks/routes/userRoutes/UserRoute';
import cors from "cors";
import path from "path";
import { createServer, Server as HTTPServer } from 'http';
import { initializeSocket } from "../../services/socketIo/SocketIo";
import { Server as SocketIoServer } from 'socket.io';
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

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
        this.app.use(cors({
            origin: "https://elitemediator.shop", // Replace with your frontend domain
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Authorization", "Content-Type"],
            credentials: true,
        }));
        
        // this.app.use(cors());
        this.app.use(cookieParser());
        const publicPath = path.join(__dirname, '..', 'public');
        this.app.use(express.static(publicPath));
    }

    private configureRoutes(): void {
        this.app.use("/api", adminRoutes);
        this.app.use("/user", userRoutes);
        this.app.use("/superAdmin", superAdminRoute);

        this.app.use('*', (req: Request, res: Response) => {
            res.status(404).json({
                success: false,
                message: 'Route not found'
            });
        });
    }

    private configureErrorHandling(): void {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            const statusCode: number = err.statusCode || 500;
            const message = err.message || "Internal server error";
            res.status(statusCode).json({
                success: false,
                statusCode,
                message,
            });
        });
    }

    private startServer(): void {
        const port = process.env.PORT || 7000;  
        this.server.listen(port, () => {
            console.log(`Express server running on port ${port}`);
        });
    }
}

// To initialize the server, create an instance of ExpressServer
// new ExpressServer();




