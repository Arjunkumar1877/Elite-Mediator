import express from 'express';
// import { serverPackage } from '../types/ServerTypes';
import adminRoutes from '../../../interfaceAdapters/routes/adminRoutes/AdminRoute'
import { serverPackage } from '../../types/ServerTypes';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export class ExpressServer{
    constructor(){
        const app:serverPackage = express();

        app.use(express.json());
        app.use('/api', adminRoutes);
        app.use((err: any, req: Request, res: Response, next: NextFunction)=>{
            const statusCode:number = err.statusCode || 500;
            const message = err.message || 'Internal server error🤷🤷'
            res.status(statusCode).json({
                success: false,
                statusCode: false,
                message
            })

        })

        app.listen(7000, ()=>{
            console.log("Express server connected on 7000");
        })
    }
}