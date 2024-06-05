import express from 'express';
import { serverPackage } from '../types/ServerTypes';
import adminRoutes from '../../../interfaceAdapters/routes/adminRoutes/AdminRoute'

export class ExpressServer{
    constructor(){
        const app:serverPackage = express();

        app.use(express.json());
        app.use('/', adminRoutes);

        app.listen(7000, ()=>{
            console.log("Express server connected on 7000");
        })
    }
}