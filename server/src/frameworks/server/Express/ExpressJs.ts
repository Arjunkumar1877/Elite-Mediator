import express from "express";
import cookieParser from "cookie-parser";

// import { serverPackage } from '../types/ServerTypes';
import adminRoutes from "../../../interfaceAdapters/routes/adminRoutes/AdminRoute";
import superAdminRoute from "../../../interfaceAdapters/routes/superAdminRoutes/SuperAdminRoute";
import userRoutes from '../../../interfaceAdapters/routes/userRoutes/UserRoute';
import { serverPackage } from "../../types/ServerTypes";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import cors from "cors";
import path from "path";

export class ExpressServer {
  constructor() {
    const app: serverPackage = express();
// app.use(express.static(path.join(__dirname, 'client/build')));



    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());

    app.use("/api", adminRoutes);
    app.use("/user", userRoutes);
    app.use("/superadmin", superAdminRoute);
    // app.post("/data", (req, res)=>{
    //     console.log(req.body)
    // })
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const statusCode: number = err.statusCode || 500;
      const message = err.message || "Internal server error🤷🤷";
      res.status(statusCode).json({
        success: false,
        statusCode: false,
        message,
      });
    });

    // app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    // });
    

    app.listen(7000, () => {
      console.log("Express server connected on 7000");
    });
  }
}
