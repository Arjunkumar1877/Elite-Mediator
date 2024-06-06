import express from 'express';
// import { serverPackage } from '../types/ServerTypes';
import adminRoutes from '../../../interfaceAdapters/routes/adminRoutes/AdminRoute'
import { serverPackage } from '../../../entities/types/ServerTypes';

export class ExpressServer{
    constructor(){
        const app:serverPackage = express();

        app.use(express.json());
        app.use('/api', adminRoutes);

        app.listen(7000, ()=>{
            console.log("Express server connected on 7000");
        })
    }
}